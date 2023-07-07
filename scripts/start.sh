#!/usr/bin/env bash

ROOT_PATH="/home/ubuntu/spring-github-action"
JAR="$ROOT_PATH/kampus.jar"

APP_LOG="$ROOT_PATH/kampus.log"
ERROR_LOG="$ROOT_PATH/error.log"
START_LOG="$ROOT_PATH/start.log"

NOW=$(date +%c)

# build 파일 복사
echo "[$NOW] $JAR 복사" >> $START_LOG
cp $ROOT_PATH/build/libs/*.jar $JAR

# jar 파일 실행
echo "[$NOW] > $JAR 실행" >> $START_LOG
nohup java -jar $JAR > $APP_LOG 2> $ERROR_LOG &

SERVICE_PID=$(pgrep -f $JAR)
echo "[$NOW] > 서비스 PID: $SERVICE_PID" >> $START_LOG
