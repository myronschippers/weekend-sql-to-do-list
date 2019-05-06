const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
    config = {}
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