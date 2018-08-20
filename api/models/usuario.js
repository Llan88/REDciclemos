'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  //Atributos propios
	nombre: {type: String,
    unique:true,
    required: [true, "nombre is neccessary"]
	apellido: String,
	alias: String,
	email: String,
	contraseña: String,
  telefono: String,
  imagen: String,
  //Atributos de clase
	tipoUsuario: {type: Schema.ObjectId, ref:'TipoUsuario'},
	localidad: {type:Schema.ObjectId, ref:'Localidad'},

  //Atributos no definitivos
  direccionEntidad: String,
  direccionWeb: String,
  fechaAltaUsuario: String,
  fechaModificacionUsuario: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
