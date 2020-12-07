# Cermat

## Requirements

* Node v12.x
* npm v6.x
* PostgreSQL + PostGIS (default username: postgres; password: postgres; database: cermat)

### Server

#### Server Stack

* TypeScript
* Express
* Knex & Objection

#### Server setup

* Copy .env_example as .env
* Change .env values to match your settings (PostgreSQL)
* Development:
  * npm install
  * `npm run db:migrate` to apply PostgreSQL migrations
  * `npm run db:seed-test` to insert test data to database
  * `npm run csv` to generate CSV from database
  * npm start
  * Express runs on <http://localhost:3002>
* Production
  * npm install
  * Copy your .env file to `server/build/` folder
  * Change `NODE_ENV` in .env file to `production`
  * `npm run build` to compile
  * Run Express and serve React code (`client/build/index.html`): `node build/src/app.js`

### Client

#### Client Stack

* TypeScript
* React
* Material UI
* react-hook-form
* @reduxjs/toolkit

#### Client setup

* Development
  * npm install
  * npm start
  * Go to <http://localhost:3000>
* Production
  * npm install
  * npm run build

### Web scraping

* Go to `data` folder
* `npm start` to create `data.json` file in the `data` folder
* `data.json` should include all schools and results
* The `data.json` is then used in server by `npm run db:seed-prod`
