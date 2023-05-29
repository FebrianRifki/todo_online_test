const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const activitesRoute = require('./app/routes/activities_routes');
const todosRoute = require('./app/routes/todo_routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', activitesRoute);
app.use('/', todosRoute);
app.use('/', function (req, res) {
    res.send({
        "msg": "devcode updated"
    })
})

// const todoRoute = require('./app/routes/todo_routes');
// app.use('/activity-groups', todoRoute);

app.listen(3030, () => console.log('Server is running on Port: 3030'));
