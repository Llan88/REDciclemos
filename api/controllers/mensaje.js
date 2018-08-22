'use strict'

var moment = require('moment');

var Usuario = require('../models/usuario');
var Mensaje = require('../models/mensaje');

function prueba(req, res){
  res.status(200).send({messsage: 'Hola'});
}

function saveMensaje(req, res){
  var params = req.body;

  if(!params.texto || !params.receptor) return res.status(200).send({message: 'Envia los datos necesarios.'});
  var mensaje = new Mensaje();
	mensaje.emisor = req.usuario.sub;
	mensaje.receptor = params.receptor;
	mensaje.texto = params.texto;
  mensaje.fechaCreacion = moment().unix();
	mensaje.visto = 'false';
  mensaje.save((err, messageStored) => {
		if(err) return res.status(500).send({message: 'Error en la peticion.'});
		if(!messageStored) return res.status(500).send({message: 'Error al enviar el mensaje.'});

		return res.status(200).send({message: messageStored});
	});
}


module.exports = {
  prueba,
  saveMensaje
}
