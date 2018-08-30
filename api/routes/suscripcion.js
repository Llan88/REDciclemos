'use strict'
var express = require('express');
var SuscripcionController = require('../controllers/suscripcion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//Rutas
api.get('/probando-suscripcion', SuscripcionController.probando);
api.post('/suscripcion', md_auth.ensureAuth , SuscripcionController.guardarSuscripcion);

module.exports = api;
