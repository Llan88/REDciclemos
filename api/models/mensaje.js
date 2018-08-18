'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeSchema = Schema({
  texto: String,
  fechaCreacion: String,
  emisor:{type: Schema.ObjectId, ref:'Usuario'},
  receptor: {type:Schema.ObjectId, ref:'Usuario'}

});

module.exports = mongoose.model('Mensaje',MensajeSchema);
