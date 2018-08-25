'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar rutas
var usuario_routes = require('./routes/usuario');

var usuario_routes = require('./routes/usuario');
var publicacion_routes = require('./routes/publicacion');
var localidad_routes = require('./routes/localidad');
var departamento_routes = require('./routes/departamento');
var suscripcion_routes = require('./routes/suscripcion');
var mensaje_routes = require('./routes/mensaje');
var tipoUsuario_routes = require('./routes/tipoUsuario');


//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors


//rutas
app.use('/api',usuario_routes);
app.use('/api', publicacion_routes);
app.use('/api',departamento_routes);
app.use('/api', suscripcion_routes);
app.use('/api', mensaje_routes);
app.use('/api',localidad_routes);
app.use('/api',tipoUsuario_routes);


//exportar
module.exports = app;
