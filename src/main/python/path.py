import os
import sys

sys.path.append('/home/ubuntu/.local/lib/python3.9/site-packages')

pythonpath = os.environ.get("PYTHONPATH")
print(pythonpath)
print("이후는 전체 환경 변수 및 해당 값")
print(os.environ)