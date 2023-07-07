#!/usr/bin/env bash

ROOT_PATH="/home/ubuntu/spring-github-action"
JAR="$ROOT_PATH/KWU Campus-0.0.1-SNAPSHOT.jar"
STOP_LOG="$ROOT_PATH/stop.log"

# 실행중인 Spring 서버의 PID
SERVICE_PID=$(pgrep -f $JAR)

if [ -z "$SERVICE_PID" ]; then
  echo "서비스 NotFound" >> $STOP_LOG
else
  echo "서비스 종료 " >> $STOP_LOG
  kill -15 $SERVICE_PID
  # kill -9 $SERVICE_PID # 강제 종료를 하고 싶다면 이 명령어 사용
fi
