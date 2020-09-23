# Cermat

## Requirements

* Node v12.x
* npm v6.x
* PostgreSQL + PostGIS (default username: postgres; password: postgres; database: rentvax)

### Server

#### Server Stack

* TypeScript
* Express
* TypeORM

#### Server setup

* Copy .env_example as .env
* Change .env values to match your settings (TypeORM PostgreSQL)
* Development:
  * npm install
  * Optional: `npm run db:seed` to insert test data to database
  * npm start
  * Express runs on http://localhost:3001
* Production
  * npm install
  * npm run build
  * Copy your .env file to `server/build/` folder
  * Change `NODE_ENV` and `TYPEORM_ENTITIES` .env values to `production` and `entities/*.js`
  * Run Express and serve React code (`client/build/index.html`): `node build/app.js`

### Client

#### Client Stack

* TypeScript
* React
* Styled components & styled system
* Formik
* @reduxjs/toolkit

#### Client setup

* Development
  * npm install
  * npm start
  * Go to http://localhost:3000
* Production
  * npm install
  * npm run build
  * Server hosts build folder in production mode on http://localhost:3001
