### Test task
___
Requirements:
 - mysql 5.7.27+
 - node 10.16.3+
 
 Before start project create database than set info for connection to .env 
 
Instructions:
 - Start project npm run start
 - For update table, set RECREATE_TABLES in .env as true
___

Task:
```
Реализовать http-server на базе фреймворка Koa2, соответствующий следующим требованиям:
  
  1) Работает с базой данных mysql. В субд есть табличка books(1e5 записей, забить самостоятельно случайно, у каждой книги должны быть поля title, date, autor, description, image). Реализация смежных табличек на усмотрение кандидата, архитектурные решения оцениваются.Работает на чистом SQL, без ORM и без Query builder
  
  2) Присутствуют три контроллера:
    2.1)  Добавляет записи в субд
    2.2)  Отдает. Сделать возможность сортировки|фильтрация по всем возможным полям, возможность порционного получения с оффсетом
    2.3)  Изменяет
```