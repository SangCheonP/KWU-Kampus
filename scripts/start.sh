#!/usr/bin/env bash

ROOT_PATH="/home/ubuntu/spring-github-action"
WAR="$ROOT_PATH/kampus-0.0.1-SNAPSHOT.war"

APP_LOG="$ROOT_PATH/kampus.log"
ERROR_LOG="$ROOT_PATH/error.log"
START_LOG="$ROOT_PATH/start.log"

NOW=$(date +%c)

# build 파일 복사
echo "[$NOW] $WAR 복사" >> $START_LOG
cp $ROOT_PATH/build/libs/*.war $WAR

# war 파일 실행
echo "[$NOW] > $WAR 실행" >> $START_LOG
nohup java -jar $WAR > $APP_LOG 2> $ERROR_LOG &

SERVICE_PID=$(pgrep -f $WAR)
echo "[$NOW] > 서비스 PID: $SERVICE_PID" >> $START_LOG
