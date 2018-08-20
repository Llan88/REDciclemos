'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleListaPrecioSchema = Schema({
  minimoKiloMaterial: String,
  precioXKilo: String,
  //Atributos de clase
  listaPrecio:{type: Schema.ObjectId, ref: 'ListaPrecio'},
  material:{type: Schema.ObjectId, ref: 'Material'},
});

module.exports = mongoose.model('DetalleListaPrecio',DetalleListaPrecioSchema);
