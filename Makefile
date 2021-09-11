setup:
	composer install
	yarn
	php artisan key:generate
	make authorize
	php artisan migrate --seed

authorize:
	sudo chmod -R 777 ./storage/
	sudo chmod -R 777 ./storage/logs/
	sudo chmod -R 777 ./storage/framework/
	sudo chmod -R 777 ./storage/framework/cache/
	sudo chmod -R 777 ./storage/framework/cache/data/
	sudo chmod -R 777 ./vendor/
	sudo chmod -R 777 ./bootstrap/cache/
	composer dump-autoload