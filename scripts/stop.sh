#!/usr/bin/env bash

ROOT_PATH="/home/ubuntu/spring-github-action"
WAR="$ROOT_PATH/kampus-0.0.1-SNAPSHOT.war"
STOP_LOG="$ROOT_PATH/stop.log"
NOW=$(date +%c)

# 실행중인 Spring 서버의 PID
SERVICE_PID=$(pgrep -f java)

if [ -z "$SERVICE_PID" ]; then
  echo "[$NOW] 서비스 NotFound" >> $STOP_LOG
else
  echo "[$NOW] $SERVICE_PID 종료 " >> $STOP_LOG
  kill "$SERVICE_PID"
  # kill -9 $SERVICE_PID # 강제 종료를 하고 싶다면 이 명령어 사용
fi
