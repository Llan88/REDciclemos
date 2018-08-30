'use strict'
var express = require('express');
var SuscripcionController = require('../controllers/suscripcion');
var api = express.Router();

//Rutas
api.get('/probando-suscripcion', SuscripcionController.probando);
api.post('saveMensaje', SuscripcionController.saveSuscripcion);

module.exports = api;
