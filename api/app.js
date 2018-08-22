'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar rutas
var usuario_routes = require('./routes/usuario');
var publicacion_routes = require('./routes/publicacion');
var localidad_routes = require('./routes/localidad');
var departamento_routes = require('./routes/departamento');
<<<<<<< HEAD
var suscripcion_routes = require('./routes/suscripcion');
=======
var mensaje_routes = require('./routes/mensaje');
>>>>>>> 2bacafc565fb0653a1b9662592a43f9c76995442

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors

//rutas
app.use('/api',usuario_routes);
app.use('/api', publicacion_routes);
app.use('/api',departamento_routes);
<<<<<<< HEAD
app.use('/api', suscripcion_routes);
=======


app.use('/api', mensaje_routes);
>>>>>>> 2bacafc565fb0653a1b9662592a43f9c76995442

//exportar
module.exports = app;
