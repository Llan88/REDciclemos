'use strict'
var express = require('express');
var SuscripcionController = require('../controllers/suscripcion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//Rutas
api.get('/probando-suscripcion', SuscripcionController.probando);
<<<<<<< HEAD
api.post('saveMensaje', SuscripcionController.saveSuscripcion);
=======
api.post('/suscripcion', md_auth.ensureAuth , SuscripcionController.guardarSuscripcion);
>>>>>>> 8e2fa294200a6094584663066d213f5ffa770007

module.exports = api;
