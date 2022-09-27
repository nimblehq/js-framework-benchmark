.PHONY: start, start_database

start: start_database
	npm run dev

start_database:
	docker-compose -f docker-compose.dev.yml up -d
