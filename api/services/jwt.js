'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_redciclemos';

exports.createToken = function(usuario){
	var payload = {
		sub: usuario._id,
		name: usuario.nombre,
		surname: usuario.apellido,
		nick: usuario.alias,
		email: usuario.email,
		role: usuario.tipoUsuario,
		image: usuario.imagen,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix
	};

	return jwt.encode(payload, secret);
};
