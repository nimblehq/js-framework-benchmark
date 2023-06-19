.PHONY: dev migrate_db

dev:
	make migrate_db &
	yarn dev &
	redis-server &
	yarn worker &
	maildev

migrate_db:
	npx prisma migrate dev --name init
