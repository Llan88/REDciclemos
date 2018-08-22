'use strict'
var express = require('express');
var DepartamentoController = require('../controllers/departamento');

var api = express.Router();

//Rutas
api.post('/guardarDepartamento', DepartamentoController.guardarDepartamento);
api.delete('/eliminarDepartamento/:id?',DepartamentoController.eliminarDepartamento);
api.get('/departamento/:id?',DepartamentoController.obtenerDepartamento);
api.get('/departamentos/:pages?',DepartamentoController.obtenerDepartamentos);
module.exports = api;
