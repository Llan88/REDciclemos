'use strict'
var bcrypt = require('bcrypt-nodejs');
//var fs= require('fs');
//var path = require('path');
var moment = require('moment');
var Usuario = require('../models/usuario');
var TipoUsuario = require('../models/tipoUsuario');
var jwt = require('../services/jwt');

var moment = require('moment');


//Registro de usuario
function guardarUsuario(req,res) {
	var params = req.body;
	var usuario = new Usuario();
	var idTipoUsuario = req.params.id;
	var prueba = false;
	var entidad = "Entidad";


if(!idTipoUsuario){
	return res.status(500).send({message:'Tipo de Usuario no enviado'});
}
var nombreTipoUsuario;
	TipoUsuario.findOne({_id: idTipoUsuario}, (err, tipoUsuario) => {
		if(err) return res.status(500).send({message:'Error en la petición'});

	 if(!tipoUsuario)res.status(404).send({message: 'No se ha registrado el usuario'});

	 nombreTipoUsuario = tipoUsuario.nombre;
	 //nombreTipoUsuario = nombreTipoUsuario.toString('utf-8').trim();

	 	console.log(nombreTipoUsuario);
	});

	if(nombreTipoUsuario == 'Entidad'){
		
		if(params.nombre && params.direccionEntidad && params.email && params.contrasenia){
			usuario.nombre = params.nombre;
			usuario.email = params.email;
			usuario.imagen = null;
			usuario.tipoUsuario = req.params.id;
			usuario.localidad = params.localidad;
			usuario.fechaCreacion = moment().unix();
			usuario.direccionEntidad =  params.direccionEntidad;
			usuario.direccionWeb = params.direccionWeb;
			usuario.telefono = params.telefono;

			prueba = true;
	}
}
	if(nombreTipoUsuario == 'Ciudadano'){
	if(params.nombre && params.apellido && params.alias && params.email && params.contrasenia && params.localidad ){

		usuario.nombre = params.nombre;
		usuario.apellido = params.apellido;
		usuario.alias = params.alias;
		usuario.email = params.email;
		usuario.imagen = null;
    //usuario.tipoUsuario = req.params.id;
    usuario.localidad = req.params.localidad;
		usuario.fechaCreacion = moment().unix();

prueba = true;
	}
}
	if(nombreTipoUsuario == 'Administrador'){
		if(params.nombre && params.apellido && params.contrasenia){
			usuario.nombre = params.nombre;
			usuario.apellido = params.apellido;
			usuario.email = params.email;
			usuario.imagen = null;
			usuario.tipoUsuario = req.params.id;
			usuario.fechaCreacion = moment().unix();

prueba = true;
	}
}
if(prueba){
//Controlar usuarios duplicados
Usuario.find({$or: [
					{email: usuario.email.toLowerCase()}
					//,					{alias:usuario.alias.toLowerCase()}
				]
			}).exec((err, usuarios) => {
				if(err) return res.status(500).send({message: 'Error en la petición de usuarios'});
				if(usuarios && usuarios.length >= 1){
					return res.status(200).send({message:'El usuario ya existe'});
				}
			});

//Cifra la contraseña y guarda los datos
bcrypt.hash(params.contrasenia, null, null, (err, hash) =>{
	usuario.contrasenia = hash;

	usuario.save((err, usuarioGuardado) => {
		if(err) return res.status(500).send({message: 'Error al guardar el usuario'}); //Clausula de guarda
		if(usuarioGuardado){
			res.status(200).send({usuario: usuarioGuardado});
		}else{
			res.status(404).send({message: 'No se ha registrado el usuario'});
		}
	});
});
}else{
		res.status(404).send({message: 'Datos incorrectos para tipo de usuario'});
}
}

//Loggin
function loginUsuario(req, res){
	var params = req.body;

	var email = params.email;
	var contrasenia = params.contrasenia;

	Usuario.findOne({email: email}, (err, usuario) =>{
		if(err) return res.status(500).send({message:'Error en la petición'});

		if(usuario){
			bcrypt.compare(contrasenia, usuario.contrasenia, (err, check) => {
				if(check){
					//devolver datos de usuario
					if(params.gettoken){
						//generar y devolver token
						return res.status(200).send({
							token: jwt.createToken(usuario)
						});
					}else{
						//devolver datos de usuario
						usuario.contrasenia = undefined;
						return res.status(200).send({usuario});
					}

				}else{
					return res.status(404).send({message: 'El usuario no se ha podido identificar'});
				}
			});
		}else{
			return res.status(404).send({message: 'El usuario no se ha podido identificar!!'});
		}
	});

}

//Edición de datos de usuario
 /*function updateUsuario(req, res){

 	var usuarioId = req.params.id;
 	var update = req.body;

 	//borrar propiedad contrasenia
 	delete update.contrasenia;

 	if(usuarioId != req.usuario.sub){
 		return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
 	}

 	Usuario.find({$or: [
						{email: update.email.toLowerCase()},
						{alias:update.alias.toLowerCase()}
						]
				}).exec((err,usuarios) => {

					var usuario_isset = false;
					usuarios.forEach((usuario)=>{
						if(usuario && usuario._id != usuarioId) usuario_isset = true;
					});

					if(usuario_isset) return res.status(404).send({message: 'Los datos ya están en uso'});

					Usuario.findByIdAndUpdate(usuarioId, update, {new:true}, (err,usuarioUpdated) => {
 						if(err) return res.status(500).send({message: 'Error en la petición'});

 						if(!usuarioUpdated) return res.status(404).send({message: 'No se ha podido actualizar los datos'});

 						return res.status(200).send({usuario: usuarioUpdated});
 					});
				});

 }*/

module.exports = {
  guardarUsuario,
	loginUsuario,
	//updateUsuario
}
