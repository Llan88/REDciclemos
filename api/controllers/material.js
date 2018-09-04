'use strict'
var bcrypt = require('bcrypt-nodejs');

var Material = require('../models/material');

function pruebaMaterial(req,res){
	res.status(200).send({
    //console.log(req.body);
		message: 'Hola desde Material.'
	});
}

//registrar materiales
function saveMaterial(req,res){
  var params = req.body;
  var material = new Material();
  material.nombre = params.nombre;
  material.kgMaximo = params.kgMaximo;
  material.kgMinimo = params.kgMinimo;
 //fechaBaja: String

  material.save((err,materialGuardado) =>{
		if(err) return res.status(500).send({message: 'Error al guardar el material, intente nuevamente.'});
		if(!materialGuardado) return res.status(404).send({message: 'El material se ha guardado exitosamente.'});
		return res.status(200).send({material:materialGuardado});
	});
}

//Eliminar un material
function deleteMaterial(req, res){

	var materialId= req.params.id;

	Material.find({'_id': materialId}).remove(err => {
		if(err) return res.status(500).send({message: 'Error al eliminar el material'});
		return res.status(200).send({message: 'Se elimino exitisamente el material seleccionado.'});
	});
}

//Obtener material
function getMaterial(req,res){

	var materialId = req.params.id;

	Material.findById(materialId,(err,material)=>{
		if(err) return res.status(500).send({message:'Error al intentar devolver el material.'});
		if(!material) return res.status(404).send({message:'El material no existe.'});
		return res.status(200).send({material});
	});
}

module.exports = {
	pruebaMaterial,
  saveMaterial,
  deleteMaterial,
  getMaterial
}
