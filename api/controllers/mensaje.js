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

function getReceivedMensajes(req, res){
  //para el usuario que esta logueado
	var usuarioId = req.usuario.sub;

	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}

	var itemsPerPage = 4;

	Mensaje.find({receptor: usuarioId}).populate('emisor', 'nombre apellido image alias _id').paginate(page, itemsPerPage, (err, mensajes, total) => {
		if(err) return res.status(500).send({message: 'Error en la peticion.'});
		if(!mensajes) return res.status(404).send({message: 'No hay Mensajes.'});

		return res.status(200).send({
			total: total,
			pages: Math.ceil(total/itemsPerPage),
			mensajes
		});
	});
}

//metodo para contar los mensajes sin leer
function getnoVistoMensajes(req, res){

	var usuarioId = req.usuario.sub;

	Mensaje.count({receptor: usuarioId, visto: 'false'}).exec((err, count) => {

		if(err) return res.status(500).send({message: 'Error en la peticion.'});
		return res.status(200).send({
			'novisto': count
		});
	})
}

//metodo para que actualice los mensajes que esten leidos
function setVistoMensajes(req, res){
	var usuarioId = req.usuario.sub;

	Mensaje.update({receptor: usuarioId, visto: 'false'}, {visto: 'true'}, {"multi": true}, (err, messageUpdated) => {
		if(err) return res.status(500).send({message: 'Error en la peticion.'});
		return res.status(200).send({
			mensajes: messageUpdated
		});
	});
}


module.exports = {
  prueba,
  saveMensaje,
  getReceivedMensajes,
  getnoVistoMensajes,
  setVistoMensajes

}
