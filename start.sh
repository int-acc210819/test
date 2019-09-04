#!/bin/bash

sudo docker-compose build
sudo docker-compose up

# init tables in db if exist
#sudo docker exec -it koa_mysql_app_1 npm run db-init

# load to mysql data from csv file
#sudo docker exec -it koa_mysql_app_1 npm run load-to-mysql