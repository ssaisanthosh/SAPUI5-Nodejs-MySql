const express = require('express');
const mysql = require('mysql');
const app = express();
var path = require('path');
const bodyparser = require('body-parser');

app.use(express.static('./'));
app.use(bodyparser.json());


app.route('/sap/*$').all(function (req, res) {
    proxy.web(req, res);
});

app.route('/resources/*$').all(function (req, res) {
    resourceProxy.web(req, res);
});

app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect(function (error) {
    if (!!error) {
        console.log('Error in DB Connection');
        resp.status(err.status || 500);
        resp.render('Error in DB Connection');
    } else {
        console.log('DB Connected');
    }
});

app.get('/Todo', function (req, resp) {
    connection.query("select * from todo;", function (error, rows, fields) {
        if (!!error) {
            console.log('Error in query');
            resp.status(500);
            resp.render('Error in query');
        } else {
            console.log('Request: getTodo GET');
            resp.json({ todo: rows });
        }
    });
});

app.delete('/Todo/:id', function (req, resp) {
    connection.query("DELETE FROM todo WHERE id = ?", [req.params.id], function (error, rows, fields) {
        if (!!error) {
            console.log('Error in query');
            resp.status(500);
            resp.render('Error in query');
        } else {
            console.log('Request: getTodo DELETE');
            resp.json("Deleted Successfully");
        }
    });
});

app.post('/Todo', function (req, resp) {
    connection.query("INSERT INTO todo (todo) VALUES (?);", [req.body.todo], function (error, rows, fields) {
        if (!!error) {
            console.log('Error in query');
            resp.status(500);
            resp.render('Error in query');
        } else {
            console.log('Request: getTodo INSERT');
            resp.json("Successfully inserted");
        }
    });
});

app.listen(1337, () => console.log("Server running at http://localhost:1337/"));