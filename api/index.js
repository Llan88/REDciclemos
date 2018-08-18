'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;
//Conexión a la BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bdredciclemos', {userMongoClient: true}).then(()=>{
  console.log("La conexión a la bd redciclemos se ha realizado correctamente!!!")
  //Crear servidor
  app.listen(port,()=>{
    console.log("Servidor corriendo en http://localhost:3800");
  });
}).catch(err=>console.log(err));
