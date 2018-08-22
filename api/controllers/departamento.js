'use strict'

var Departamento = require('../models/departamento');
var mongoosePaginate = require('mongoose-pagination');

//Ragistro departamento
function guardarDepartamento(req,res){
  var params = req.body;
  var departamento = new Departamento();
  if(params.nombre){
    departamento.nombre = params.nombre;
  }
  departamento.save((err,departamentoGuardado) =>{
		if(err) return res.status(500).send({message: 'Error al guardar el departamento'});
		if(!departamentoGuardado) return res.status(404).send({message: 'El departamento no se ha guardado'});
		console.log('departamentoGuardado');
		return res.status(200).send({departamento:departamentoGuardado});
	});
}

//Elimina departamento
function eliminarDepartamento(req, res){
	var departamentoId= req.params.id;
	Departamento.find({'_id': departamentoId}).remove(err => {
		if(err) return res.status(500).send({message: 'Error al eliminar el departamento'});
		return res.status(200).send({message: 'Se ha eliminado el departamento'});
	});
}

//Obtiene un departamento
function obtenerDepartamento(req,res){
	var departamentoId = req.params.id;
	Departamento.findById(departamentoId,(err, departamento)=>{
		if(err) return res.status(500).send({message:'Error al devolver el departamento'});
		if(!departamento) return res.status(404).send({message:'El departamento no existe'});
		return res.status(200).send({departamento});
	});
}

//Función para obtener todos los departamentos, con paginación
function obtenerDepartamentos(req, res){
	var page = 1;

	if(req.params.page){
		page = req.params.page;
	}
	var itemsPerPage = 5;
	Departamento.find().sort('_id').paginate(page, itemsPerPage, (err, departamentos, total) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});
		if(!departamentos) return res.status(404).send({message: 'No hay departamentos disponibles'});
    return res.status(200).send({
			departamentos,
			total,
			page: Math.ceil(total/itemsPerPage)
			});
	});
}

module.exports ={
  guardarDepartamento,
  eliminarDepartamento,
  obtenerDepartamento,
  obtenerDepartamentos
}
