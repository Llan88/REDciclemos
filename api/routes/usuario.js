'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuarios'});

//Rutas
api.post('/registroUsuario/:id1/:id2',UsuarioController.guardarUsuario);
api.post('/login',UsuarioController.loginUsuario);
//api.put('/updateUsuario/:id',UsuarioController.updateUsuario);



//Exports
module.exports = api;
