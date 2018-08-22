'use strict'

//var path = require('path');
//var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

// exportar modelos de los datos
var Suscripcion = require('../models/suscripcion');

function probando(req, res){
	res.status(200).send({message: 'Hola desde el CONTROLADOR DE suscripciones'});
}

module.exports = {
  probando

}
