'use strict'

var express = require('express');
var MessageController = require('../controllers/mensaje');
var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

//rutas
api.get('/prueba', MessageController.prueba);
api.post('/saveMensaje', MessageController.saveMensaje);

module.exports = api;
