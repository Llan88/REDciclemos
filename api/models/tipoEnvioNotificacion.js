'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoEnvioNotificacionSchema = Schema({
	nombre: String,
	fechaBaja: String
});

module.exports = mongoose.model('TipoEnvioNotificacion', TipoEnvioNotificacionSchema);
