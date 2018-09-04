'use strict'

var express = require('express');
var MaterialController = require('../controllers/material');

var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.get('/pruebaMaterial', MaterialController.pruebaMaterial);
api.post('/registroMaterial',LocalidadController.saveMaterial);
api.delete('/eliminarMaterial/:id',LocalidadController.deleteMaterial);
api.get('/obtenerMaterial/:id',LocalidadController.getMaterial);

module.exports = api;
