const mysql = require('mysql');
const express = require('express');
var cors = require('cors')
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({//middleware 
    extended:true
}));

app.use(bodyparser.json())

app.use(cors())

var mysqlConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});

mysqlConn.connect((err) => {
    if (!err) {
        console.log('Conexão sucedida!');
    }
    else {
        console.log('Conexão falhou!!' + JSON.stringify(err, undefined,2));
        }   
});

const routes = require('../app/routes/routes');
routes(app,mysqlConn); //passando o objeto app para o arquivo de rotas

module.exports = app,mysqlConn;

