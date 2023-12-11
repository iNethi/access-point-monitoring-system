#!/bin/bash

cd backend/ap_monitor || exit
docker-compose up -d inethi-ap-monitor-mysql || exit
#sleep 20 || exit
#docker-compose build --no-cache && docker-compose up -d || exit
cd ../.. || exit

cd ui/ap-monitor || exit
docker-compose up -d

echo DONE!
