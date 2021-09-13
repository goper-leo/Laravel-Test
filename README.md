# laravel-test
Laravel - Vue test

### Setup
After cloning the project.

- Run `make setup` on project root folder.
- Create database and update the `DB_DATABASE`, `DB_PASSWORD` and `DB_USERNAME` according to your setup.
- Finally run `make run` (***This will seed the database you've given.***). If you cannot run `make`
just follow this steps.
    - Run `composer install`
    - Run `yarn`
    - Copy `.env.example` and create new file name `.env`
    - Run `php artisan key:generate`
    - Set permissions on files.
    - Run `php artisan migrate:fresh --seed`
    - Run `yarn dev`
    - Finally `php artisan serve`, open `http://127.0.0.1:8000/`