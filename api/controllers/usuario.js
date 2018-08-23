'use strict'
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario');

//Registro de usuario
function guardarUsuario(req,res) {
	var params = req.body;
	var usuario = new Usuario();

	if(params.nombre && params.apellido && params.alias && params.email && params.contrasenia && params.localidad ){
		usuario.nombre = params.nombre;
		usuario.apellido = params.apellido;
		usuario.alias = params.alias;
		usuario.email = params.email;
		usuario.imagen = null;
    usuario.tipoUsuario = params.tipoUsuario;
    usuario.localidad = params.localidad;

		//Controlar usuarios duplicados
		Usuario.find({$or: [
							{email: usuario.email.toLowerCase()},
							{nick:usuario.alias.toLowerCase()}
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
		res.status(200).send({
			message: 'Envia todos los campos necesarios!!'
		});
	}
}

module.exports = {
  guardarUsuario
}
