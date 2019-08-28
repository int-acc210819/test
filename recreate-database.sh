#!/bin/bash
mysql -u root -proot << MY_QUERY
USE mysql
drop database if exists koa_mysql;
create database koa_mysql character set UTF8;
MY_QUERY