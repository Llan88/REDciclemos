'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuarios'});

//Rutas
api.post('/registro/:i?d',UsuarioController.guardarUsuario);


//Exports
module.exports = api;
