.PHONY: start, start_database

start: start_database
	npm run start:dev

start_database:
	docker-compose -f docker-compose.dev.yml up -d
