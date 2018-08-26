'use strict'
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario');
var jwt = require('../services/jwt');

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
    usuario.tipoUsuario = req.params.id;
    usuario.localidad = params.localidad;
		usuario.fechaCreacion = moment().unix();

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

module.exports = {
  guardarUsuario,
	loginUsuario
}
