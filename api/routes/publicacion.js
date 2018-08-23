'use strict'

var express = require('express');
var PublicationController = require('../controllers/publicacion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty'); //Módulo para subir archivos.
var md_upload = multipart({uploadDir:'./uploads/publicaciones'});

api.get('/probando',PublicationController.probando);
api.post('/publicacion',md_auth.ensureAuth,PublicationController.guardarPublicacion);
api.get('/publicaciones/:page?',md_auth.ensureAuth,PublicationController.obtenerPublicaciones);


module.exports = api;
