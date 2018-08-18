'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoSchema = Schema({
	nombreTipoUsuario: String,
	fechaBaja: String, //Este atributo no se de que tipo es
});

module.exports = mongoose.model('TipoUsuario', TipoUsuarioSchema);
