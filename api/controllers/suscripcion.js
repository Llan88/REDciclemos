'use strict'

//var path = require('path');
//var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

// exportar modelos de los datos
var Suscripcion = require('../models/suscripcion');
var Material = require('../models/material');
var Localidad = require('../models/localidad');

function probando(req, res){
	res.status(200).send({message: 'Hola desde el CONTROLADOR DE suscripciones'});
}

function saveSuscripcion (req, res){
 var params = req.body;

 console.log(req.body);

 var suscripcion = new Suscripcion();
 suscripcion.usuario = req.usuario.sub; //usuario identificado
 suscripcion.material = params.material; //material seguido

suscripcion.save((err, suscripcionStored) => {
	 if(err) return res.status(500).send({message: 'Error al guardar el seguimiento'});

	 //en el caso que no me llegue nada
	 if(!suscripcionStored) return res.status(404).send({message: 'El seguimiento no se ha guardado'});

	 return res.status(200).send({suscripcion: suscripcionStored});
 });
}
module.exports = {
  probando,
	saveSuscripcion

}
