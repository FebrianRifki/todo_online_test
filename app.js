require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const activitesRoute = require('./app/routes/activities_routes');
const todosRoute = require('./app/routes/todo_routes');
const { migration } = require('./app/models/db.js');

const port = process.env.PORT || 3030;
const host = process.env.HOST || 'localhost';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', activitesRoute);
app.use('/', todosRoute);
app.use('/', function (req, res) {
    res.send({
        "msg": "devcode updated"
    })
})

const run = async () => {
    await migration(); // running migration before server
    app.listen(port); // running server
    console.log(`Server run on http://${host}:${port}/`);
};

run();
