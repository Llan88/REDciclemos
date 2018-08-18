'use strict'

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var SuscripcionSchema = Schema({
  fechaCreacion: String,
  fechaBaja:String,
  user:{type: Schema.ObjectId, ref: 'Usuario'},
  material: {type: Schema.ObjectId, ref: 'Material'},
  localidad: {type: Schema.ObjectId, ref: 'Localidad'}
});

module.exports = mongoose.model('Suscripcion', SuscripcionSchema);
