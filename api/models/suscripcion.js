'use strict'

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var SuscripcionSchema = Schema({
  fechaCreacion: String,
  fechaBaja:String,
  usuario_suscripcion:{type: Schema.ObjectId, ref: 'Usuario'},
  material: {type: Schema.ObjectId, ref: 'Material'},
  localidad: {type: Schema.ObjectId, ref: 'Localidad'},
  TipoEnvioNotificacion: {type: Schema.ObjectId, ref:'TipoEnvioNotificacion'}
});

module.exports = mongoose.model('Suscripcion', SuscripcionSchema);
