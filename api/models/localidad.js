'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalidadSchema = Schema({
  nombre: String
//  departamento: {type: Schema.ObjectId,ref:'Departamento'}
});

module.exports = mongoose.model('Localidad', LocalidadSchema);
