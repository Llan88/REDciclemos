'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartamentoSchema = Schema({
  nombre: String
});

module.exports = mongoose.model('Departamento',DepartamentoSchema);
