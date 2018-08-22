'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReciclajeSchema = Schema({
	kilosMaterial: String,

	usuario:{type: Schema.ObjectId, ref: 'Usuario'},
	material:{type: Schema.ObjectId, ref: 'Material'},

});

module.exports = mongoose.model('Reciclaje',ReciclajeSchema);
