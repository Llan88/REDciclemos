'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

// exportar modelos de los datos

var Publicacion = require('../models/publicacion');
var Usuario = require('../models/usuario');
var Suscripcion = require('../models/suscripcion');
var Reciclaje = require('../models/reciclaje');

function probando(req, res){
	res.status(200).send({message: 'Hola desde el CONTROLADOR DE PUBLICACIONES'});
}

// Creacion de publicaciones

function guardarPublicacion(req, res){

	var params = req.body; //Recoge los valores que le llegan por la petición

	var reciclaje = new Reciclaje();
	var publicacion = new Publicacion();

	if(!params.text || !params.kilosMaterial) return res.status(200).send({message:'Debes enviar un texto!!'});

//Generamos a reciclaje
	reciclaje.kilosMaterial = params.kilosMaterial;
	reciclaje.usuario = req.user.sub;
	reciclaje.material = params.material;

	reciclaje.save((err, reciclajeStored) => {
				if(err) return res.status(500).send({message:'Error al guardar reciclaje'});
				if(!reciclajeStored) return res.status(404).send({message: 'El reciclaje NO ha sido guardado'});
				//relacionar reciclaje con publicacion
				publicacion.reciclaje = reciclajeStored._id;
			 // res.status(200).send({reciclaje: reciclajeStored});
	});


//Guardamos varibles de la publicacion



			publicacion.descripcion = params.text;
			publicacion.imagen = 'null';
			publicacion.usuario = req.user.sub;
			publicacion.fechaCreacion = moment().unix();

			publicacion.save((err,publicationStored) => {
				if(err) return res.status(500).send({message: 'Error al guardar la publicación'});
				if(!publicationStored) return res.status(404).send({message:'La publicación no ha sido guardada'});
				return res.status(200).send({publicacion: publicationStored, reciclaje: reciclajeStored});
			});
		}


function obtenerPublicaciones(req, res){
		var page = 1;
		var usuarioId = req.user.sub;
		if(req.params.page){
				page = req.params.page;
		}
<<<<<<< HEAD
 		var itemsPerPage = 5; //decidir cuantas publicaciones por pagina colocar

		//Obter publicaciones de materiales suscriptos
		Suscripcion.find({usuario_suscripcion: usuarioId}).populate('material').exec((err, suscripciones) => {
				if(err) return res.status(500).send({message: 'Error al devolver las suscripciones'});
 				if(!suscripciones) return res.status(404).send({message: 'No se encuentran suscripciones asociadas'});
 				var suscripciones_material =[];
 				suscripciones.forEach((suscripcion) => {
						suscripciones_material.push(suscripcion.material);
				});
 				console.log(suscripciones_material);
 				//Reciclaje.find()
				//(cambiar por publicacion) Reciclaje.find({material: {"$in": suscripciones_material}}).sort('-created_at').populate('usuario').paginate(page, itemsPerPage, (err, publicaciones))
		});
 }

function obtenerPublicacion(req, res){
	var publicacionId = req.params.id;
=======

		var itemsPerPage = 5; //decidir cuantas publicaciones por pagina colocar

//Obter publicaciones de materiales suscriptos
		Suscripcion.find({usuario_suscripcion: usuarioId}).populate('material').exec((err, suscripciones) => {
				if(err) return res.status(500).send({message: 'Error al devolver las suscripciones'});

				if(!suscripciones) return res.status(404).send({message: 'No se encuentran suscripciones asociadas'});

				var suscripciones_material =[];

				suscripciones.forEach((suscripcion) => {
						suscripciones_material.push(suscripcion.material);
				});

				console.log(suscripciones_material);

				//Reciclaje.find()
				//(cambiar por publicacion) Reciclaje.find({material: {"$in": suscripciones_material}}).sort('-created_at').populate('usuario').paginate(page, itemsPerPage, (err, publicaciones))
		});

}

function obtenerPublicacion(req,res){
	var publicacionId = req.params.id;

	Publicacion.findById(publicacionId,(err, publicacion)=>{
		if(err) return res.status(500).send({message:'Error al devolver la publicación'});
		if(!publicacion) return res.status(404).send({message:'No existe la publicacion'});
		return res.status(200).send({publicacion});
});
}


function obtenerPublicaciones(req, res){
>>>>>>> aafddc10e22766bed898d97862a7ddf654645f67

	Publicacion.findById(publicacionId,(err, publication)=>{
		if(err) return res.status(500).send({message:'Error al devolver la publicación'});
		if(!publication) return res.status(404).send({message:'No existe la publicacion'});
		return res.status(200).send({publication});
	});
}


function eliminarPublicacion(req,res){
	var publicacionId = req.params.id;

	Publicacion.find({'usuario':req.user.sub,'_id':publicacionId}).remove(err =>{

		if(err) return res.status(500).send({message: 'Error al eliminar la publicación'});
		return res.status(200).send({message: 'Publicación eliminada correctamente'});
	});
}

function subirImagen(req, res){

 	var publicacionId = req.params.id;

 	if(req.files){
 		var file_path = req.files[Object.keys(req.files)[0]].path;
 		console.log(file_path);

 		var file_split = file_path.split('\\');
 		console.log(file_split);

 		var file_name = file_split[2];
 		console.log(file_name);

 		var ext_split = file_name.split('\.');
 		console.log(ext_split);
 		var file_ext = ext_split[1];
 		console.log(file_ext);


 		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' || file_ext == 'JPG'){
 			//añadir imagen de la publicacion de usuario logueado
 			Publicacion.findByIdAndUpdate(publicacionId,{imagen: file_name}, {new:true}, (err,publicacionUpdated)=>{
 				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!publicacionUpdated) return res.status(404).send({message:'No se ha podido actualizar la publicación'});

				return res.status(200).send({publicacion: publicacionUpdated});
 			});

 		} else{
 			return removeFilesOfUploads(res, file_path, 'Extensión no válida');
 		}
 	}else{
 		return res.status(200).send({message: 'No se han subido imagenes'});
 	}
 }

module.exports = {
  probando,
  guardarPublicacion,
	obtenerPublicaciones,
	obtenerPublicacion,
	eliminarPublicacion,
	subirImagen

}
