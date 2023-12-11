#!/bin/bash

cd backend || exit
docker-compose up -d inethi-ap-monitor-mysql || exit
docker-compose build --no-cache && docker-compose up -d || exit
cd .. || exit

cd ui || exit
docker-compose up -d

echo DONE!
