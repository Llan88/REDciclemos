'use strict'

var express = require('express');
var MessageController = require('../controllers/mensaje');
var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

//rutas
api.get('/prueba', MessageController.prueba);
api.post('/saveMensaje', MessageController.saveMensaje);
api.get('/mi-mensaje/:page?',  MessageController.getReceivedMensajes);
api.get('/novisto-mensaje',  MessageController.getnoVistoMensajes);
api.get('/set-visto-mensaje', MessageController.setVistoMensajes);

module.exports = api;
