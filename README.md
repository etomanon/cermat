# Cermat

## Requirements

* Node v14.15.1
* npm v6.x
* PostgreSQL + PostGIS (default username: postgres; password: postgres; database: cermat)

### Data - Web scraping

* Go to `data` folder
* `npm start` to create `data.json` file in the `data` folder
* `data.json` should include all schools and results
* The `data.json` is then used in server by `npm run db:seed-prod`
* Try `npm run fix` to get data for schools which could not be loaded before

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
  * `npm run db:setup` to apply PostgreSQL migrations, seed prod data and generate CSV file
  * npm start
  * Express runs on <http://localhost:3002>
* Production
  * npm install
  * Change `NODE_ENV` in .env file to `production`
  * Seed database with prod data - `npm run db:setup`
  * `npm run build` to compile
  * Copy your .env file to `server/build/` folder
  * Run Express and serve React code (`client/build/index.html`): `node build/src/app.js`

### Client

#### Client Stack

* TypeScript
* React
* Material UI
* styled-components
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
