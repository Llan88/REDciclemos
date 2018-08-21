'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var usuario_routes = require('./routes/usuario');
var localidad_routes = require('./routes/localidad');
var departamento_routes = require('./routes/departamento');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors

//rutas
app.use('/api',usuario_routes);
app.use('/api',departamento_routes);
//exportar
module.exports = app;
