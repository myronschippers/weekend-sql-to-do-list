const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'todo',
        max: 10,
        idleTimeoutMillis: 30000,
    }
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('Pool connected!');
});

pool.on('error', (err) => {
    console.log('DB Error: ', err);
    process.exit(-1);
});

module.exports = pool;