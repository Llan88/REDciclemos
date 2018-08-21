'use strict'
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario');

function home(req,res){
  res.status(200).send({message: 'Hola mundo desde el servidor de NodeJs'});
}

function pruebas(req, res){
  console.log(req.body);
  res.status(200).send({
    message: 'Acción de pruebas en el servidor de NodeJS'
  });
}

//Registro de usuario
function guardarUsuario(req,res) {
	var params = req.body;
	var usuario = new Usuario();

  if(params.tipoUsuario = 'Ciudadano'){
    if(params.nombre && params.apellido
     && params.alias && params.email && params.contraseña ){
      usuario.nombre = params.nombre;
      usuario.apellido = params.apellido;
      usuario.alias = params.alias;
      usuario.email = params.email;
      usuario.telefono = params.telefono;
      usuario.tipoUsuario = params.tipoUsuario;
      usuario.localidad = params.localidad;
      usuario.image = null;

      //Controlar usuarios duplicados
      Usuario.find({$or: [
                {email: usuario.email.toLowerCase()},
                {alias:usuario.alias.toLowerCase()}
                ]
            }).exec((err, usuarios) => {
              if(err) return res.status(500).send({message: 'Error en la petición de usuarios'});
              if(usuarios && usuarios.length >= 1){
                return res.status(200).send({message:'El usuario ya existe'});
              }
            });

      //Cifra la contraseña y guarda los datos
      bcrypt.hash(params.contraseña, null, null, (err, hash) =>{
        usuario.contraseña = hash;

        usuario.save((err, usuarioGuardado) => {
          if(err) return res.status(500).send({message: 'Error al guardar el usuario'}); //Clausula de guarda
          if(usuarioGuardado){
            res.status(200).send({user: usuarioGuardado});
          }else{
            res.status(404).send({message: 'No se ha registrado el usuario'});
          }
        });
      });

    }else{
      res.status(200).send({
        message: 'Envia todos los campos necesarios!!'
      });
    }
  }else{
    if(params.nombre && params.apellido
     && params.alias && params.email && params.contraseña ){
      usuario.nombre = params.nombre;
      usuario.email = params.email;
      usuario.tipoUsuario = params.tipoUsuario;
      usuario.localidad = params.localidad;
      usuario.image = null;
      usuario.direccionWeb = params.direccionWeb;
      usuario.direccionEntidad = params.direccionEntidad;

      //Controlar usuarios duplicados
      Usuario.find({$or: [
                {email: usuario.email.toLowerCase()}
                ]
            }).exec((err, usuarios) => {
              if(err) return res.status(500).send({message: 'Error en la petición de usuarios'});
              if(usuarios && usuarios.length >= 1){
                return res.status(200).send({message:'El usuario ya existe'});
              }
            });

      //Cifra la contraseña y guarda los datos
      bcrypt.hash(params.contraseña, null, null, (err, hash) =>{
        usuario.contraseña = hash;
        usuario.save((err, usuarioGuardado) => {
          if(err) return res.status(500).send({message: 'Error al guardar el usuario'});
          if(usuarioGuardado){
            res.status(200).send({user: usuarioGuardado});
          }else{
            res.status(404).send({message: 'No se ha registrado el usuario'});
          }
        });
      });

    }else{
      res.status(200).send({
        message: 'Envia todos los campos necesarios!!'
      });
    }
  }

}

module.exports = {
  home,
  pruebas,
  guardarUsuario
}
