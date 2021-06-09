up:
	docker-compose stop
	docker-compose up -d api mongo

build:
	docker-compose stop
	docker-compose up -d --build mongo api

logs:
	docker-compose logs -f api

up-and-log: 	
	docker-compose stop
	docker-compose up -d api mongo
	docker-compose  logs -f api
	
down: 
	docker-compose down