const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');

todoRouter.get('/', (req, res) => {
    // lock the order down to something
    const queryString = `SELECT * FROM "todo" ORDER BY "id" ASC`;

    pool.query(queryString)
        .then((response) => {
            const rowsData = response.rows;
            res.send(rowsData);
        })
        .catch((err) => {
            console.log(`Error retrieving from DB: ${err}`);
            res.sendStatus(500);
        });
});

todoRouter.post('/', (req, res) => {
    const queryString = `INSERT INTO "todo" ("task", "completed")
                        VALUES ($1, false);`;
    const userData = req.body;

    pool.query(queryString, [userData.task])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error posting to DB: ${err}`);
            res.sendStatus(500);
        });
});

todoRouter.put('/', (req, res) => {});

todoRouter.delete('/', (req, res) => {});

module.exports = todoRouter;
