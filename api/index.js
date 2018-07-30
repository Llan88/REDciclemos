'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //aquí busca express
var port = 3800;

//Conexion Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/REDciclemos')
	.then(()=> {
		console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente");

		//crear servidor
		app.listen(port,()=>{
			console.log("Servidor corriendo en http://localhost:3800");
		});
	})
	.catch(err=>console.log(err));
