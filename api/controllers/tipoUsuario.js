'use strict'
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var TipoUsuario = require('../models/tipoUsuario');

//Registro tipo de usuario
function saveTipoUsuario(req,res){
  var params = req.body;
  if(!params.nombre) return res.status(500).send({message: 'Envia los campos necesarios'});
  var tipoUsuario = new TipoUsuario;
  tipoUsuario.nombre = params.nombre;
  tipoUsuario.save((err,tipoUsuarioGuardado)=>{
    if(err) return res.status(500).send({message:'Error en la petición'});
    if(!tipoUsuarioGuardado) return res.status(500).send({message: 'Error al guardar el tipo de usuario'});
    return res.status(200).send({tipoUsuario:tipoUsuarioGuardado});
  });
}

//Elimina tipo de usuario
function deleteTipoUsuario(req, res){
	var tipoUsuarioId= req.params.id;
	TipoUsuario.find({'_id': tipoUsuarioId}).remove(err => {
		if(err) return res.status(500).send({message: 'Error al eliminar el tipo de usuario'});
		return res.status(200).send({message: 'Se ha eliminado el tipo de usuario'});
	});
}

//Obtiene un tipo de usuario
function getTipoUsuario(req,res){
	var tipoUsuarioId = req.params.id;
	TipoUsuario.findById(tipoUsuarioId,(err, tipoUsuario)=>{
		if(err) return res.status(500).send({message:'Error al devolver el tipo de usuario'});
		if(!tipoUsuario) return res.status(404).send({message:'El tipo de usuario no existe'});
		return res.status(200).send({tipoUsuario});
	});
}

//Función para obtener todos los departamentos, con paginación
function getTipoUsuarios(req, res){
	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}
	var itemsPerPage = 5;
	TipoUsuario.find().sort('_id').paginate(page, itemsPerPage, (err, tipoUsuarios, total) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});
		if(!tipoUsuarios) return res.status(404).send({message: 'No hay tipos de usuarios disponibles'});
    return res.status(200).send({
			tipoUsuarios,
			total,
			page: Math.ceil(total/itemsPerPage)
			});
	});
}


module.exports={
  saveTipoUsuario,
  deleteTipoUsuario,
  getTipoUsuario,
  getTipoUsuarios
}
