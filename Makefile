setup:
	composer install
	yarn
	cp .env.example .env
	php artisan key:generate
	make authorize

run:
	php artisan migrate:fresh --seed
	yarn dev
	php artisan serve

authorize:
	sudo chmod -R 777 ./storage/
	sudo chmod -R 777 ./storage/logs/
	sudo chmod -R 777 ./storage/framework/
	sudo chmod -R 777 ./storage/framework/cache/
	sudo chmod -R 777 ./storage/framework/cache/data/
	sudo chmod -R 777 ./vendor/
	sudo chmod -R 777 ./bootstrap/cache/
	composer dump-autoload
