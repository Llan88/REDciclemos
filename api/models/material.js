'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema = Schema({
  nombre: String,
  kgMaximo: String,
  kgMinimo: String,
  fechaBaja: String,
});

module.exports = mongoose.model('Material', MaterialSchema);
