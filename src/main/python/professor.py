from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options  # ChromeOptions 추가
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import datetime, timedelta
import requests
import urllib3
from selenium.common.exceptions import NoSuchElementException
import mysql.connector

# ChromeOptions를 생성하고 headless 모드를 활성화합니다
# chrome_options = Options()
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (Linux에서 필요한 경우)
# chrome_options.add_argument("--no-sandbox")  # Linux에서 필요한 경우
# chrome_options.add_argument("--disable-dev-shm-usage")  # Linux에서 필요한 경우

requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS += ':HIGH:!DH:!aNULL'

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 현재 날짜를 가져옵니다
current_date = datetime.now()

# 2개월 전 날짜를 계산합니다
two_month_ago = current_date - timedelta(days=60)

professor_list = ['electronic01', 'electronic02', 'electronic03', 'electronic04', 'electronic05', 'electronic06', 'electronic07',
                  'electronic08', 'electronic09', 'convergence03', 'engineering01', 'engineering02', 'engineering03', 'engineering04',
                  'science01', 'science02', 'science03', 'science04', 'science05', 'social01', 'social02', 'social03', 'social04',
                  'social05', 'social06', 'social07', 'social08', 'law01', 'law02', 'law03', 'law04', 'law05', 'law07',
                  'business01', 'business02', 'ingenium01']

# 정보를 저장할 이중 리스트를 초기화합니다
result_list = []
driver = webdriver.Chrome()
count = 0
for professor in professor_list:
    # 웹 드라이버를 시작합니다
    url = 'https://www.kw.ac.kr/ko/univ/'+professor+'_2.jsp'
    driver.get(url)
    time.sleep(3)

    for target_page in ['2', '3']:  # 'tpage=2' 및 'tpage=3'을 대상으로 반복
        while True:
            # 모든 항목을 찾습니다
            list_items = driver.find_elements(By.CSS_SELECTOR, '#departmentProfessor > tbody > tr > td:nth-child(2) > a')

            for item in list_items:
                name = item.text
                href = item.get_attribute('href')
                result_list.append([name, href])
                count += 1

            # "tpage"를 포함하는 링크를 찾아서 클릭합니다
            try:
                next_page_link = driver.find_element(By.CSS_SELECTOR, f'#professorList > div.paginate > div > div > a:not(.ico-page.first):not(.current):not(.last)[href*="tpage={target_page}"]')
                next_page_link.click()
                time.sleep(3)
            except NoSuchElementException:
                break  # "tpage"를 포함하는 링크를 찾을 수 없을 때 루프 종료

    # 현재 사이트 작업 완료, 다음 사이트로 이동
    # (for 루프 다음 반복으로 이동)

# 브라우저를 닫습니다
driver.quit()

# 결과를 출력합니다
for item in result_list:
    print(item)

unique_list = []
acount = 0

# 중첩된 리스트에서 중복 제거
for sublist in result_list:
    if sublist not in unique_list:
        unique_list.append(sublist)
        acount += 1

print(unique_list)
print(count)
print(acount)

# Python과 mariaDB 연결
dbconn = mysql.connector.connect(
    host="13.124.194.184",
    user="capstone",
    passwd="1234",
    database="capstone",
    connection_timeout = 1000
)

# 검색을 할 경우 사용되는 함수.
def select(query, bufferd=True):
    global dbconn
    cursor = dbconn.cursor(buffered=bufferd)
    cursor.execute(query)
    return cursor

# DML(Data Manipulation Language)의 insert, update, delete를 처리하는 함수
def merge(query, values, bufferd=True):
    global dbconn
    try:
        cursor = dbconn.cursor(buffered=bufferd)
        cursor.executemany(query, values)
        dbconn.commit()
    except Exception as e:
        dbconn.rollback()
        raise e

# DML(Data Manipulation Language)의 insert, update, delete를 대랑 처리하는 함수
def merge_bulk(query, values, bufferd=True):
    global dbconn
    try:
        cursor = dbconn.cursor(buffered=bufferd)
        cursor.executemany(query, values)
        dbconn.commit()
    except Exception as e:
        dbconn.rollback()
        raise e

# DML이외의 쿼리를 실행하는 함수.
def execute(query, bufferd=True):
    global dbconn
    try:
        cursor = dbconn.cursor(buffered=bufferd)
        cursor.execute(query)
        dbconn.commit()
    except Exception as e:
        dbconn.rollback()
        raise e

try:
    # 초기 테이블 생성시 1회만 시행
    # 테이블 PythonTable를 생성한다.
    # execute("""
    # CREATE TABLE professor (
    # name varchar(255),
    # url varchar(255))
    # """)

    # 테이블 PythonTable에 data를 초기화한다.
    dbconn.connect()
    execute("DELETE FROM professor")

    # 테이블 PythonTable에 data를 INSERT한다.
    print("코드 업데이트 시작")
    merge_bulk("INSERT INTO professor (name, url) VALUES (%s, %s)", unique_list)
    print("professor 업데이트 완료")

except Exception as e:
    print(e)
finally:
    dbconn.close()