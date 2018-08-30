'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  //Atributos propios
	nombre:String,
	apellido: String,
	alias: String,
	email: String,
	contrasenia: String,
  telefono: String,
  imagen: String,
	fechaCreacion: String,
	fechaModificacion: String,
  //Atributos de clase
	tipoUsuario: {type: Schema.ObjectId, ref:'TipoUsuario'},
	localidad: {type:Schema.ObjectId, ref:'Localidad'},

  //Atributos entidad
  direccionEntidad: String,
  direccionWeb: String,

});

module.exports = mongoose.model('Usuario', UsuarioSchema);
