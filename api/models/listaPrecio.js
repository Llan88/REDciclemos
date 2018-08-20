'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListaPrecioSchema = Schema({
  fechaUltimaActualizacion: String,
  //Atributos de clase
  user:{type: Schema.ObjectId, ref: 'Usuario'},
});

module.exports = mongoose.model('ListaPrecio',ListaPrecioSchema);
