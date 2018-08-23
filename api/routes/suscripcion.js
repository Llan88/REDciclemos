'use strict'
var express = require('express');
var SuscripcionController = require('../controllers/suscripcion');

var api = express.Router();

//Rutas
api.get('/probando-suscripcion', SuscripcionController.probando);
//api.get('/departamentos/:pages?',SuscripcionController.prueba);
module.exports = api;
