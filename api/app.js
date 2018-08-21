'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var usuario_routes = require('./routes/usuario');
<<<<<<< HEAD
var publicacion_routes = require('./routes/publicacion');
=======
var localidad_routes = require('./routes/localidad');
var departamento_routes = require('./routes/departamento');
>>>>>>> 207be3f8388b634219271646b9c105f9ebd9d2dc

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors

//rutas
app.use('/api',usuario_routes);
<<<<<<< HEAD
app.use('/api', publicacion_routes);
=======
app.use('/api',departamento_routes);
>>>>>>> 207be3f8388b634219271646b9c105f9ebd9d2dc
//exportar
module.exports = app;
