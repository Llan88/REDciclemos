'use strict'

var express = require('express');
var LocalidadController = require('../controllers/localidad');


var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

//Rutas
api.post('/registroLocalidad/:id',LocalidadController.guardarLocalidad);
api.delete('/localidad/:id',LocalidadController.eliminarLocalidad);
api.get('/obtenerlocalidad/:id',LocalidadController.obtenerLocalidad);
api.get('/obtenerlocalidades/:pages?',LocalidadController.obtenerLocalidades);

module.exports = api;
