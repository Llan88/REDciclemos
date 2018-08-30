'use strict'

//var path = require('path');
//var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

// exportar modelos de los datos
var Suscripcion = require('../models/suscripcion');

function probando(req, res){
	res.status(200).send({message: 'Hola desde el CONTROLADOR DE suscripciones'});
}

function guardarSuscripcion(req, res){
			var params = req.body;

			var suscripcion = new Suscripcion();

			if(params.material){
				suscripcion.save((err, suscripcionStored) => {
							if(err) return res.status(500).send({message:'Error al guardar suscripcion'});
							if(!suscripcionStored) return res.status(404).send({message: 'El suscripcion NO ha sido guardado'});
							//relacionar reciclaje con material
							suscripcion.material = params.material;
							//relacionar suscripcion con usuario y localidad
							suscripcion.usuario_suscripcion = req.user.sub;
							suscripcion.localidad = req.user.localidad;

							suscripcion.fechaCreacion = moment().unix();
							suscripcion.fechaBaja = null;
						  res.status(200).send({suscripcion: suscripcionStored});
				});
			}

}
function getSuscripciones(req, res){
				
}

module.exports = {
  probando,
	guardarSuscripcion,
	getSuscripciones

}
