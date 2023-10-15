from bs4 import BeautifulSoup      # 크롤링 사이트의 값을 가져오는 함수
import requests
import urllib3
import mysql.connector

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
from datetime import datetime, timedelta

requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS += ':HIGH:!DH:!aNULL'

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

soft_list = []
electro_list = []
human_list = []
business_list = []
ingenium_list = []
engin_list = []
natural_list = []
policy_list = []

result_list = []

def Software_Convergence():
    url = "https://npsw.kw.ac.kr/site/sub.php?Tid=27&Ctnum=28&Ctid=HM28"

    req = requests.get(url, verify=False)
    soup = BeautifulSoup(req.text, "html.parser")  # html에 대하여 접근할 수 있도록

    # department = soup.find('title').string
    notice = soup.select('div.tbl_notice a')
    date = soup.select('div.tbl_notice tbody tr td:nth-of-type(5)')

    count = 0

    for i,j in zip(notice, date):
        href = str(i.attrs['href']).lstrip(".")
        text = str(i.string)
        date = str(j.text).replace("/", "-")
        if count < 10:
            soft_list.append(["소프트웨어융합대학", "https://npsw.kw.ac.kr/site"+href, text, date])

def Electronic_Information():
    url = "https://ei.kw.ac.kr/community/notice.php"

    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.d_sj.tl a')
    date = soup.select('td.d_dt')

    count = 0

    for i,j in zip(notice, date):
        text = str(i.text).rstrip()
        href = str(i.attrs['href'])
        date = str(j.text)
        if count < 10:
            electro_list.append(("전자정보공과대학", "https://ei.kw.ac.kr"+href, text, date))
            count += 1

def Humanities_and_Social_Sciences():
    url = "https://chss.kw.ac.kr/notice/news.php"

    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice_1 = soup.select('div.notice_list tr td a')
    date = soup.select('td.d_dt')

    count = 0

    for i,j in zip(notice_1, date):
        href = str(i.attrs['href'])
        text = str(i.text)
        date = str(j.text)
        if count < 10:
            human_list.append(["인문사회과학대학", "https://chss.kw.ac.kr"+href, text, date])
            count += 1

def Business():
    url = "https://biz.kw.ac.kr/community/notice.php"

    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.d_sj.tl a')
    date = soup.select('td.d_dt')

    count = 0

    for i,j in zip(notice, date):
        href = str(i.attrs['href'])
        text = str(i.text).rstrip()
        date = str(j.text)
        if count < 10:
            business_list.append(["경영대학", "https://biz.kw.ac.kr"+href, text, date])
            count += 1

def Ingenium():
    url = "https://ingenium.kw.ac.kr/inform/notice.php"

    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.d_sj.tl > a')
    date = soup.select('td.d_dt')

    count = 0

    for i,j in zip(notice, date):
        text = str(i.text).rstrip()
        href = str(i.attrs['href'])
        date = str(j.text)
        if count < 10:
            ingenium_list.append(["인제니움학부대학", "https://ingenium.kw.ac.kr"+href, text, date])
            count += 1

def Engineering():
    global engin_list

    req = requests.get("https://archi.kw.ac.kr/community/notice.php")
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.d_sj.tl a')
    date = soup.select('div.notice_list tr td.d_dt')

    count = 0

    for i,j in zip(notice, date):
        href = str(i.attrs['href'])
        text = str(i.text).rstrip()
        date = str(j.text)
        if count < 10:
            engin_list.append(["공과대학", "https://archi.kw.ac.kr"+href, "[건축공학과]"+text, date])
            count += 1

    req = requests.get("https://chemng.kw.ac.kr/community/notice.php")
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.subject a')
    date = soup.select('td.w_date')

    count = 0

    for i,j in zip(notice, date):
        href = str(i.attrs['href'])
        text = str(i.text).rstrip()
        date = str(j.text)
        if count < 10:
            engin_list.append(["공과대학", "https://chemng.kw.ac.kr/"+href, "[화학공학과]"+text, date])
            count += 1

    req = requests.get("http://env.kw.ac.kr/community/notice.php")
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.subject a')
    date = soup.select('td.w_date')

    count = 0

    for i,j in zip(notice, date):
        href = str(i.attrs['href'])
        text = str(i.text).rstrip()
        date = str(j.text)
        if count < 10:
            engin_list.append(["공과대학", "http://env.kw.ac.kr"+href, "[환경공학과]"+text, date])
            count += 1

    engin_list = sorted(engin_list, key=lambda engin_list: engin_list[-1], reverse=True)
    engin_list = engin_list[:10]

def Natural():
    url = "https://chem.kw.ac.kr/board/department"

    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")

    department = str(soup.find('title').string)
    notice = soup.select('td.sbj a')
    date = soup.select('td.date')

    for i,j in zip(notice, date):
        text = str(i.text).rstrip()
        href = str(i.attrs['href'])
        date = str(j.text).lstrip("작 성 일").replace(".","-")
        natural_list.append(("자연과학대학", "https://chem.kw.ac.kr"+href, "[화학과]"+text, "20"+date))

def Policy_Law():
    global policy_list

    req = requests.get("https://kwpa.kw.ac.kr/notice/faculty.php")
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.d_sj.tl a')
    date = soup.select('div.notice_list tr td.d_dt')

    count = 0

    for i,j in zip(notice, date):
        href = str(i.attrs['href'])
        text = str(i.text).rstrip()
        date = str(j.text)
        if count < 10:
            policy_list.append(["정책법학대학", "https://kwpa.kw.ac.kr"+href, "[행정학과]"+text, date])
            count += 1

    req = requests.get("https://law.kw.ac.kr/bulletin/notice.php")
    soup = BeautifulSoup(req.text, "html.parser")

    # department = str(soup.find('title').string)
    notice = soup.select('td.d_sj.tl a')
    date = soup.select('div.notice_list td.d_dt')

    count = 0

    for i,j in zip(notice, date):
        href = str(i.attrs['href'])
        text = str(i.text).rstrip()
        date = str(j.text)
        if count < 10:
            policy_list.append(["정책법학대학", "https://law.kw.ac.kr"+href, "[법학부]"+text, date])
            count += 1

    policy_list = sorted(policy_list, key=lambda policy_list: policy_list[-1], reverse=True)
    policy_list = policy_list[:10]

start = time.time()

requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS += ':HIGH:!DH:!aNULL'

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def building():
    # 현재 날짜를 가져옵니다
    current_date = datetime.now()

    # 2개월 전 날짜를 계산합니다
    two_month_ago = current_date - timedelta(days=60)

    facilities_list = ['80주년', '누리관', '다산재', '복지관', '비마관', '빛솔재', '새빛관', '아이스링크',
                       '연구관', '문화관', '연촌재', '옥의관', '참빛관', '한울관', '한천재', '화도관']

    # 웹 드라이버를 시작합니다
    url = 'https://www.kw.ac.kr/ko/life/notice.jsp?srCategoryId=&mode=list&searchKey=3&searchVal=&x=14&y=11'
    driver = webdriver.Chrome()
    driver.get(url)

    for facilities in facilities_list:
        search_box = driver.find_element(By.XPATH, '//*[@id="jwxe_main_content"]/div/div/form/div/div/input[2]')
        search_box.clear()
        search_box.send_keys(facilities)
        # time.sleep(0.5)  # .5초 대기

        # 입력 필드 내용을 지우기
        search_box.send_keys(Keys.RETURN)

        # 약간의 대기 시간 추가
        # time.sleep(0.5)

        # 모든 항목을 찾습니다
        list_items = driver.find_elements(By.CSS_SELECTOR, '.board-list-box > ul > li')

        for item in list_items:
            title = item.find_element(By.CSS_SELECTOR, 'div > a').text
            href = item.find_element(By.CSS_SELECTOR, 'div > a').get_attribute('href')
            date_str = item.find_element(By.CSS_SELECTOR, '.info').text.split('|')[2].strip()
            # '수정일'을 '날짜'로 설정하려면 아래와 같이 수정합니다.
            date_str = date_str.replace('수정일', '').strip()
            date = datetime.strptime(date_str, '%Y-%m-%d')

            # 날짜가 1개월 이내인 항목만 이중 리스트에 추가합니다
            if date >= two_month_ago:
                result_list.append([facilities, href, title, date.strftime("%Y-%m-%d")])



    # 브라우저를 닫습니다
    driver.quit()

# Python과 mariaDB 연결
dbconn = mysql.connector.connect(
    host="13.124.194.184",
    user="capstone",
    passwd="1234",
    database="capstone",
    connection_timeout = 1000
)

# Software_Convergence()
# Electronic_Information()
# Humanities_and_Social_Sciences()
# Business()
# Ingenium()
# Engineering()
# Natural()
# Policy_Law()

# 검색을 할 경우 사용되는 함수.
def select(query, bufferd=True):
    # 전역에 선언되어 있는 connection을 가져온다.
    global dbconn

    # 커서를 취득한다. (bufferd는 내부의 검색 버퍼를 사용하는데(connection 리소스를 아끼기 위한 값)
    # 검색되어 있는 값은 메모리에 두고 재 요청이 올 경우, 디비에 검색을 하지 않고 메모리의 값이 리턴 됨, 특히 대용량 페이징을 사용할 때 사용하면 좋음.
    cursor = dbconn.cursor(buffered=bufferd)
    # 쿼리를 실행한다.
    cursor.execute(query)
    # 검색 결과를 확인하기 위해서는 커서를 리턴해야 한다.
    # cursor.fetchall()로 결과를 리스트로 내보낼 수도 있다.
    # 그러나 결과가 대용량일 경우 fetchall로 대량의 값을 메모리에 넣으면 느려질 수 있다.
    return cursor

# DML(Data Manipulation Language)의 insert, update, delete를 처리하는 함수
def merge(query, values, bufferd=True):
    # 전역에 선언되어 있는 connection을 가져온다.
    global dbconn
    try:
        # 커서를 취득한다.
        cursor = dbconn.cursor(buffered=bufferd)
        # 쿼리를 실행한다. values는 query 값에 있는 sql query식의 바인딩 값이다.
        # 문자열 포멧팅으로 설정된다. values는 튜플 값으로 입력된다.
        cursor.executemany(query, values)
        # 쿼리를 커밋한다.
        dbconn.commit()
    except Exception as e:
        # 에러가 발생하면 쿼리를 롤백한다.
        dbconn.rollback()
        raise e

# DML(Data Manipulation Language)의 insert, update, delete를 대랑 처리하는 함수
def merge_bulk(query, values, bufferd=True):
    # 전역에 선언되어 있는 connection을 가져온다.
    global dbconn
    try:
        # 커서를 취득한다.
        cursor = dbconn.cursor(buffered=bufferd)
        # 쿼리를 실행한다. values는 query 값에 있는 sql query식의 바인딩 값이다.
        # 문자열 포멧팅으로 설정된다. values는 리스트 튜플 값으로 입력된다.
        cursor.executemany(query, values)
        # 쿼리를 커밋한다.
        dbconn.commit()
    except Exception as e:
        # 에러가 발생하면 쿼리를 롤백한다.
        dbconn.rollback()
        raise e

# DML이외의 쿼리를 실행하는 함수.
def execute(query, bufferd=True):
    # 전역에 선언되어 있는 connection을 가져온다.
    global dbconn
    try:
        # 커서를 취득한다.
        cursor = dbconn.cursor(buffered=bufferd)
        # 쿼리를 실행한다.
        cursor.execute(query)
        # 쿼리를 커밋한다.
        dbconn.commit()
    except Exception as e:
        # 에러가 발생하면 쿼리를 롤백한다.
        dbconn.rollback()
        raise e

def update():
    try:
        # 초기 테이블 생성시 1회만 시행
        # 테이블 PythonTable를 생성한다.
        # execute("""
        # CREATE TABLE notice_web (
        # dept varchar(255),
        # site varchar(255),
        # notice varchar(255),
        # date varchar(255))
        # """)
        # 테이블 PythonTable에 data를 초기화한다.
        Software_Convergence()
        Electronic_Information()
        Humanities_and_Social_Sciences()
        Business()
        Ingenium()
        Engineering()
        Natural()
        Policy_Law()
        building()
        dbconn.connect()

        execute("DELETE FROM notice_web")
        execute("DELETE FROM building_notice")

        # 테이블 PythonTable에 data를 INSERT한다.
        print("코드 업데이트 시작")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", electro_list)
        print("eletro_list 업데이트 완료")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", human_list)
        print("human_list 업데이트 완료")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", business_list)
        print("business_list 업데이트 완료")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", ingenium_list)
        print("ingenium_list 업데이트 완료")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", soft_list)
        print("soft_list 업데이트 완료")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", engin_list)
        print("engin_list 업데이트 완료")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", natural_list)
        print("natural_list 업데이트 완료")
        merge_bulk("INSERT INTO notice_web (dept, site, notice, date) VALUES (%s, %s, %s, %s)", policy_list)
        print("policy_list 업데이트 완료")

        merge_bulk("INSERT INTO building_notice (building, site, notice, date) VALUES (%s, %s, %s, %s)", result_list)
        print("result_list 업데이트 완료")
        print("코드 업데이트 완료")

    except Exception as e:
        print(e)
    finally:
        # connection을 다 사용하면 반드시 connection 리소스를 닫는다.
        dbconn.close()

update()

# i=0
# schedule.every(10).seconds.do(update)
# while i<10:
#   schedule.run_pending()
#   time.sleep(1)