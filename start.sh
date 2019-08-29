#!/bin/bash

sudo docker-compose build
sudo docker-compose up

# init tables in db if exist
#sudo docker exec -it koa_mysql_app_1 npm run db-init