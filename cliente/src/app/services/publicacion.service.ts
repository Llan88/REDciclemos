import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Publicacion } from '../models/publicacion';

@Injectable()
  export class PublicacionService{

    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }
    addPublicacion(token, publicacion): Observable<any>{
      let params = JSON.stringify(publicacion);
      let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

      return this._http.post(this.url+'publication', params, {headers: headers});
    }
    
  }
