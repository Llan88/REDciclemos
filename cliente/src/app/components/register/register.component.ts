import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit{
  public title: string;
  public usuario: Usuario;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = 'Registrate';
    this.usuario = new Usuario(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    )
  }
  ngOnInit(){
    console.log('Componente de registro cargado');
  }
/*OnSubmit(form){
		this._usuarioService.register(this.usuario).subscribe(
			response => {
				if(response.usuario && response.usuario._id){
					//console.log(response.usuario);
					this.status = 'success';
					form.reset();
				}else{
					this.status = 'error';
				}
			},
			error => {
				console.log('<any>error');
			}
		);
	}*/
}
