import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publicacion } from  '../../models/publicacion';
import { GLOBAL } from '../../services/global';
import { PublicacionService } from '../../services/publicacion.service';


@Component({
  selector: 'publicacion',
  templateUrl: './publicacion.component.html',
  providers: [UserService, PublicacionService]
})

export class PublicacionesComponent implements OnInit{

    public title: string;
    //public identity;
    //public token;
    public url: string;
    public status: string;
    public page;
    public total;
    public itemsPerPage;
    public publicaciones: Publicaciones[];

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _publicacionService: PublicacionService
    ){
      this.title= 'Publicaciones';
      this.url = GLOBAL.url;
      this.page = 1;
    }
    ngOnInit(){
        console.log("COmponentes de publicaciones se cargo");
    }

    getPublicaciones(page){

    }

}
