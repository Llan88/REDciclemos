'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
//var mongoosePaginate = require('mongoose-pagination');

// exportar modelos de los datos

var Publicacion = require('../models/publicacion');
var Usuario = require('../models/usuario');

function probando(req, res){
	res.status(200).send({message: 'Hola desde el CONTROLADOR DE PUBLICACIONES'});
}

// Creacion de publicaciones

function guardarPublicacion(req, res){

	var params = req.body; //Recoge los valores que le llegan por la petición

	var publicacion = new Publicacion();

	if(!params.text) return res.status(200).send({message:'Debes enviar un texto!!'});

//Guardamos varibles de la publicacion
	publicacion.descripcion = params.text;
	publicacion.imagen = 'null';
	publicacion.usuario = req.usuario.sub;
	publicacion.fechaCreacion = moment().unix();
  publicacion.reciclaje = 'null';

	publicacion.save((err,publicationStored) => {
		if(err) return res.status(500).send({message: 'Error al guardar la publicación'});
		if(!publicationStored) return res.status(404).send({message:'La publicación no ha sido guardada'});
		return res.status(200).send({publicacion: publicationStored});
	});

}
module.exports = {
  probando,
  guardarPublicacion
}
