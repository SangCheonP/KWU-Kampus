from bs4 import BeautifulSoup      # 크롤링 사이트의 값을 가져오는 함수
import requests
import urllib3
#오류 코드 비활성화
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

context = ssl.SSLContext(ssl.PROTOCOL_TLS)
context.set_ciphers('DEFAULT@SECLEVEL=0')  # DH 키 크기 설정

url = "https://npsw.kw.ac.kr/site/sub.php?Tid=27&Ctnum=28&Ctid=HM28"

#사이트 url 획득
req = requests.get(url, verify=False, timeout=5, headers={"User-Agent": "Mozilla/5.0"}, stream=True)
# html에 대하여 접근할 수 있도록
soup = BeautifulSoup(req.text, "html.parser")

#학과를 알기 위해서 title의 text를 추출, 저장
# department = soup.find('title').string
#공지사항 획득
notice = soup.select('div.tbl_notice a')
#td 중 날짜가 있는 5배수의 td만 추출
date = soup.select('div.tbl_notice tbody tr td:nth-of-type(5)')

notice_list = []

#notice에 있는 항목 중, href로 주소, string으로 공지사항 제목 획득 후
#생성해놓은 notice_list에 학과, 주소, 제목 저장
#str타입 변환은 나중에 mariadb에 입력시 NavigableString오류를 해결하기 위함
for i,j in zip(notice, date):
    text = str(i.string)
    href = str(i.attrs['href']).lstrip(".")
    date = str(j.text).replace("/", "-")
    notice_list.append(["소프트웨어융합대학", "https://npsw.kw.ac.kr/site"+href, text, date])


#출력
for i in notice_list:
    print(i)