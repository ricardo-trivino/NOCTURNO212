import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioNocturnoService } from '../servicio-nocturno.service';

@Component({
  selector: 'app-tipos-doc',
  templateUrl: './tipos-doc.component.html',
  styleUrls: ['./tipos-doc.component.css']
})
export class TiposDocComponent implements OnInit {

  TipDocs: any = [];              //Lista de Tipos de Documentos
  TituloTipDocs = "";             //Titulo Lista de Tipos de Documentos
  TablaTipDocs: any = [];        //Encabezados tabla Lista de Tipos de Documentos

  TituloTipDoc = ""; //Titulo del tipo de doc buscado
  MiTipDoc: any = []; //Tipo de documento buscado
  TabBusTipDocs: any = []; //Encabezados tabla Tipo de Documento Buscado
  comboListaTipDoc: any = [];

  title = "Manejo de Tipos de Documentos";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  //************************************************************************************
  //Form group 
  ListaTiposDocum = new FormGroup(
    {

    });

  filtrarTipDoc = new FormGroup(
    {
      combofiltro: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioNocturnoService,
      Router: Router
    ) { }

  //---------------------------------------------------------------------------------------
  //Consultar todos los tipos documentos
  public consultaTipoDocumentos(op: any) {
    if (this.controlLista == 1) {
      //console.log("component")
      this.servi.getTipDocs().subscribe((data: any) => {
        //console.error(" El listado 2 " );
        if (op == 1) {
          let dat = data;

          this.TipDocs = data; //JSON.parse(data);
          this.TituloTipDocs = "LISTA DE TIPOS DE DOCUMENTOS";
          this.TablaTipDocs[0] = "Indicador";
          this.TablaTipDocs[1] = "Denominación";
          this.TablaTipDocs[2] = "Iniciales";
          console.error(" El listado 3 " + this.TipDocs);
        }
        else if (op == 2) {
          this.comboListaTipDoc = data; //JSON.parse(data);
          this.MiTipDoc = null;
          this.TituloTipDoc = "";
          this.TabBusTipDocs[0] = "";
          this.TabBusTipDocs[1] = "";
          this.TabBusTipDocs[2] = "";
          console.error(" El listado 4 ");
        }
        else if (op == 3) {/*
        this.comboEditarTipDoc = JSON.parse(data);
        this.MiTipDocE = null;
        this.TituloTipDocEdit = "";
        // this.ActualizarATipDoc.removeControl("textnuevotipdoc");
        // this.ActualizarATipDoc.removeControl("textnuevoinicialestipdoc");
        console.error(" El listado 5 ");*/
        }

      },
        error => { console.error(error + " ") });
    }
    else {
      this.TipDocs = null;
      this.TituloTipDocs = "";
      this.TablaTipDocs[0] = "";
      this.TablaTipDocs[1] = "";
      this.TablaTipDocs[2] = "";
      this.controlLista = 1;
    }
  }

  //---------------------------------------------------------------------------------------------
  //Limpiar la lista

  public LimpiarLista() {
    this.controlLista = 0;
  }

  //---------------------------------------------------------------------------------------------
  //Busca tipo de documento por su id
  public buscarTipDoc() {
    var filtrovalor = this.filtrarTipDoc.getRawValue()['combofiltro'];
    this.servi.getTipDoc('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipDoc = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusTipDocs[0] = "Indicador";
      this.TabBusTipDocs[1] = "Denominación";
      this.TabBusTipDocs[2] = "Iniciales";
    },
      error => { console.log(error) });
  }
  //----------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.ListaTiposDocum = this.formBuilder.group(
      {

      });
    this.filtrarTipDoc = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}
