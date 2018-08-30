'use strict'

var Localidad = require('../models/localidad');



//Registra localidad
function guardarLocalidad(req,res){
  var params = req.body;
  var localidad = new Localidad();
  localidad.nombre = params.nombre;
  localidad.departamento = req.params.id;
  localidad.save((err,localidadGuardada) =>{
		if(err) return res.status(500).send({message: 'Error al guardar la localidad'});
		if(!localidadGuardada) return res.status(404).send({message: 'La localidad se ha guardado'});
		console.log('localidadGuardada');
		return res.status(200).send({localidad:localidadGuardada});
	});
}
//Elimina localidad
function eliminarLocalidad(req, res){
	var localidadId= req.params.id;
	Localidad.find({'_id': localidadId}).remove(err => {
		if(err) return res.status(500).send({message: 'Error al eliminar la localidad'});
		return res.status(200).send({message: 'Se ha eliminado la localidad'});
	});
}

//Obtiene una localidad
function obtenerLocalidad(req,res){
	var localidadId = req.params.id;
	Localidad.findById(localidadId,(err,localidad)=>{
		if(err) return res.status(500).send({message:'Error al devolver la localidad'});
		if(!localidad) return res.status(404).send({message:'La localidad no existe'});
		return res.status(200).send({localidad});
	});
}

//Obtiene todos los departamentos, con paginación
function obtenerLocalidades(req, res){
	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}
	var itemsPerPage = 5;
	Localidad.find().sort('_id').paginate(page, itemsPerPage, (err, localidades, total) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});
		if(!localidades) return res.status(404).send({message: 'No hay localidades disponibles'});
    return res.status(200).send({
			localidades,
			total,
			page: Math.ceil(total/itemsPerPage)
			});
	});
}


module.exports = {
  guardarLocalidad,
  eliminarLocalidad,
  obtenerLocalidad,
  obtenerLocalidades
}
