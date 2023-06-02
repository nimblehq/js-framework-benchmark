.PHONY: start stop start_db stop_db migrate_db

start:
	make start_db && \
	make migrate_db && \
	npm run dev

stop:
	make stop_db
	
start_db:
	docker-compose up -d
	
stop_db:
	docker-compose stop

migrate_db:
	npx prisma migrate dev --name init
