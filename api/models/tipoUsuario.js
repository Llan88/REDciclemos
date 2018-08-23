'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoUsuarioSchema = Schema({
	nombre: String,
	fechaBaja: String
});

module.exports = mongoose.model('TipoUsuario', TipoUsuarioSchema);
