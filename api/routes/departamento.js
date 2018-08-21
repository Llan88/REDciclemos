'use strict'
var express = require('express');
var DepartamentoController = require('../controllers/departamento');

var api = express.Router();

//Rutas
api.get('/guardarDepartamento', DepartamentoController.guardarDepartamento);

module.exports = api;
