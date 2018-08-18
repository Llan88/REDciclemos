'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicacionSchema = Schema({
	descripcion: String,
	imagen: String,
	fechaCreacion:String,
	usuario:{type: Schema.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('Publicacion',PublicacionSchema);
