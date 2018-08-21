'use strict'

var Departamento = require('../models/departamento');

function guardarDepartamento(req,res){
  console.log(req.body);
  res.status(200).send({message: 'Hola soy el departamento'});
}

module.exports ={
  guardarDepartamento
}
