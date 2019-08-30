# Test task

---

### With Docker

 - install docker
 
    - ```curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -```

    - ```sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"```

    - ```sudo apt-get update```

    - ```apt-cache policy docker-ce```

    - ```sudo apt-get install -y docker-ce```

 -  install docker compose
    - ```sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose```
    
    - ```sudo chmod +x /usr/local/bin/docker-compose```
    
    - ```sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose```
    
 - start bash script
    - ```sh ./start```
___

### Without Docker

Requirements:
 - mysql 5.7.27+
 - node 10.16.3+
 
 Before start project create database than set info for connection to .env 
 
Instructions:
 - Create tables in database npm run db-init
 - Start project npm run start
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

___

## Documentation

Application have next endpoints:
 - Create author
    - ```
      curl -X POST \
           http://localhost:3000/author/create \
           -H 'Content-Type: application/json' \
           -d '{
         	"name": "Esenin"
         }'
      ```
 - Create image
    - ```
      curl -X POST \
           http://localhost:3000/image/create \
           -H 'Content-Type: application/json' \
           -d '{
         	"link": "http://google.com/15.jpg"
         }'
      ```
 - Create book
    - ```
      curl -X POST \
           http://localhost:3000/book/create \
           -H 'Content-Type: application/json' \
           -d '{
         	"author": 1,
         	"image": 1,
         	"title": "Justin book",
         	"description": "Lorem ipsum dolor."
         }'
      ```
 - Get book
    - ```
      curl -X GET \
           'http://localhost:3000/book/?size=3&page=1&filter=eni' \
           -H 'Content-Type: application/json'
      ```
 - Update book
    - ```
      curl -X PUT \
           http://localhost:3000/book/update/1 \
           -H 'Content-Type: application/json' \
           -d '{
         	"image": 3,
         	"oldImage": 1,
         	"title": "Updated book"
         }'
      ```

---

## History

v2:
- version history in readme
- docker
- update book
- simple documentation in readme about endpoints

v1:
- base (all except update book)
