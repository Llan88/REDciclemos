'use strict'

var express = require('express');
var TipoUsuario = require('../controllers/tipoUsuario');

var api = express.Router();

api.post('/registroTipoUsuario',TipoUsuario.saveTipoUsuario);
api.delete('/deleteTipoUsuario/:id',TipoUsuario.deleteTipoUsuario);
api.get('/getTipoUsuario/:id',TipoUsuario.getTipoUsuario);
api.get('/getTipoUsuarios/:pages?',TipoUsuario.getTipoUsuarios);


module.exports = api;
