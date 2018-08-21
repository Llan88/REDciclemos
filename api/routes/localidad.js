'use strict'

var express = require('express');
var LocalidadController = require('../controllers/localidad');

var api = express.Router();
/*var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuarios'});*/

//api.post('/registroLocalidad',LocalidadController.guardarLocalidad);
//api.get('/getLocalidades',LocalidadController.getLocalidades);

module.exports = api;
