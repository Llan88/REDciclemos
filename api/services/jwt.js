'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_redciclemos';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.nombre,
		surname: user.apellido,
		nick: user.alias,
		email: user.email,
		role: user.tipoUsuario,
		image: user.imagen,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix
	};

	return jwt.encode(payload, secret);
};
