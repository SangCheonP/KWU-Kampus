#!/bin/bash

ROOT_PATH="/home/ubuntu/spring-github-action"
WAR="$ROOT_PATH/application.war"

APP_LOG="$ROOT_PATH/application.log"
ERROR_LOG="$ROOT_PATH/error.log"
START_LOG="$ROOT_PATH/start.log"

NOW=$(date +%c)

echo "[$NOW] $WAR 복사" >> $START_LOG
cp $ROOT_PATH/build/libs/spring-github-action-1.0.0.war $WAR

echo "[$NOW] > $WAR 실행" >> $START_LOG
nohup java -war $WAR > $APP_LOG 2> $ERROR_LOG &

SERVICE_PID=$(pgrep -f $WAR)
echo "[$NOW] > 서비스 PID: $SERVICE_PID" >> $START_LOG
