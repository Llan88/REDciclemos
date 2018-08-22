'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar rutas
var usuario_routes = require('./routes/usuario');
var publicacion_routes = require('./routes/publicacion');
var localidad_routes = require('./routes/localidad');
var departamento_routes = require('./routes/departamento');
var mensaje_routes = require('./routes/mensaje');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors

//rutas
app.use('/api',usuario_routes);
app.use('/api', publicacion_routes);
app.use('/api',departamento_routes);


app.use('/api', mensaje_routes);

//exportar
module.exports = app;
