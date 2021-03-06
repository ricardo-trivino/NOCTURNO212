import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Librería para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicioNocturnoService } from './servicio-nocturno.service';

import { AppComponent } from '../app/appcomponent/app.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { TiposDocComponent } from './tipos-doc/tipos-doc.component';

//========================================================================
const appRoutes: Routes =
  [
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'Inicio'
    },
    {
      path: 'Inicio',
      component: MenuInicioComponent,
    },
    {
      path: 'Tip-doc',
      component: TiposDocComponent,
    }
  ]

//========================================================================

@NgModule({
  declarations: [
    AppComponent,
    MenuInicioComponent,
    TiposDocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    BrowserModule,
    HttpClientModule  // <- Agregar la clase
  ],
  providers: [ServicioNocturnoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
