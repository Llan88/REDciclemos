'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors

//rutas
app.get('/',(req,res)=>{

  res.status(200).send({message: 'Hola mundo desde el servidor de NodeJs'});
});

app.post('/pruebas',(req, res)=>{
  console.log(req.body);
  res.status(200).send({
    message: 'Acción de pruebas en el servidor de NodeJS'
  });
});
//exportar
module.exports = app;
