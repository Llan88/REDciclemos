import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  providers: []
})

export class FooterComponent implements OnInit{
  public url;
  constructor(){
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log("footer.componet ha sido cargado");
  }
}
