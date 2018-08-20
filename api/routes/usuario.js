'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuarios'});

api.get('/home',UsuarioController.home);
api.get('/pruebas',md_auth.ensureAuth,UsuarioController.pruebas);
api.post('/registro',md_auth.ensureAuth,UsuarioController.guardaUsuario);

module.exports = api;
