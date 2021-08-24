# Laravel assessment

## Packages installation
 to install required packages, run the following command:

    composer install && npm install

---

## Project preparation:

This projects depends on `tymon/jwt-auth` which needs a  `secret key` to run, to generate this key you can run:

    php artisan jwt:secret

---

## Database connection:
as this project will not go live, there is nothing to do with database connection, there is already a sqlite database connected. 
___

## Database preparation:
- run: `php artisan migrate:fresh` to create required tables in the database
-  run `php artisan db:seed` which generates fake data ti interact with

Then the project should be ready !

## Notes:

- you can use any `email` from the `quotes list` with `password` as password to login.
- after loged in, a `token` will be generated, you can copy it from the 
- there is a file called `SE-Factory Assessment.postman_collection.json` which can be imported into `postman`, then you can test `api-endpoints` like (adding,editing,removing) quotes.