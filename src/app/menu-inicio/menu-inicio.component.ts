import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent implements OnInit {

  title = "Menú Inicio"
  constructor() { }

  ngOnInit(): void {
  }

}
