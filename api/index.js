'use strict'
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bdredciclemos', {userMongoClient: true}).then(()=>{
  console.log("La conexión a la bd redciclemos se ha realizado correctamente!!!").catch(err=>console.log(err));
});
