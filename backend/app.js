const express = require('express');
const logger = require('morgan');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.get('/tasks', async (req, res, next) => {
    const query = `
        select id, title, points, status
        from task;
    `;
    try {
        const result = await pool.query(query);
        res.status(200).send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/tasks', async (req, res, next) => {
    const { title, points } = req.body;
    const query = `
        insert into task (title, points, status)
        values ('${title}', ${points}, 'To Do')
        returning id, title, points, status;
    `;
    try {
        const result = await pool.query(query);
        res.status(200).send(result.rows[0]);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/tasks', async (req, res, next) => {
    const { id, currentStatus, newStatus } = req.body;
    console.log(req.body);
    const updateQuery = `
        update task
        set status = '${newStatus}'
        where id = ${id} and status = '${currentStatus}'
        returning id, title, points, status;
    `;

    try {
        const result = await pool.query(updateQuery);
        console.log(result);
        if(!result.rows.length) {
            res.status(404).send({
                error: 'There is no such task or status mismatch',
            })
        }

        res.status(200).send(result.rows[0]);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/tasks', async (req, res, next) => {
    const { id } = req.body;

    const deleteQuery = `
        delete from task
        where id = ${id}
        returning id;
    `;


    try {
        const result = await pool.query(deleteQuery);
        if(!result.rows.length) {
            res.status(404).send({
                error: 'There is no such task or status mismatch',
            })
        }

        res.status(200).send(result.rows[0]);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Error handling
app.use((req, res, next) => {
    res.status(404).send();
});

module.exports = app;

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});