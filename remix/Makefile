.PHONY: up start_db

up:
	make start_db
	make migrate_db
	npm run dev

down:
	make stop_db
	
start_db:
	docker-compose up -d
	
stop_db:
	docker-compose down -v

migrate_db:
	npx prisma migrate dev --name init
