.PHONY: up start_db

up:
	make start_db
	npm run dev
	
start_db:
	docker-compose up -d

migrate_db:
	npx prisma migrate dev --name init
