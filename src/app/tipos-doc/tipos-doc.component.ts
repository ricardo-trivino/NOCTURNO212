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

  TipDocs: any = []; //Lista de Tipos de Documentos
  TituloTipDocs = ""; //Titulo Lista de Tipos de Documentos
  TablaTipDocs: any = []; //Encabezados tabla Lista de Tipos de Documentos

  TituloTipDoc = ""; //Titulo del tipo de doc buscado
  MiTipDoc: any = []; //Tipo de documento buscado
  TabBusTipDocs: any = []; //Encabezados tabla Tipo de Documento Buscado
  comboListaTipDoc: any = [];

  title = "Manejo de Tipos de Documentos";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloTipDocEdit = ""; //Titulo de Tipo de Documento a Editar
  MiTipDocE: any = []; //Tipo de Documento a Editar
  comboEditarTipDoc: any = []; //Combo Editar Tipo de Documento

  //Form group 
  ListaTiposDocum = new FormGroup(
    {

    });
  filtrarTipDoc = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGTipDoc = new FormGroup(
    {
      textTipDoc: new FormControl(),
      textIniTipDoc: new FormControl()
    });
  ActualizarATipDoc = new FormGroup(
    {
      BuscarIdTipDoc: new FormControl(),
      textnuevotipdoc: new FormControl(),
      textnuevoinicialestipdoc: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioNocturnoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de documentos
  public consultaTipoDocumentos(op: any) {

    if (this.controlLista == 1) {
      this.servi.getTipDocs().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.TipDocs = data;
          this.TituloTipDocs = "LISTA DE TIPOS DE DOCUMENTOS";
          this.TablaTipDocs[0] = "Indicador";
          this.TablaTipDocs[1] = "Denominación";
          this.TablaTipDocs[2] = "Iniciales";
        }
        else if (op == 2) {
          this.comboListaTipDoc = data;
          this.MiTipDoc = null;
          this.TituloTipDoc = "";
          this.TabBusTipDocs[0] = "";
          this.TabBusTipDocs[1] = "";
        }
        else if (op == 3) {
          this.comboEditarTipDoc = data;
          this.MiTipDocE = null;
          this.TituloTipDocEdit = "";
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

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar un tipo de documento por su id
  public buscarTipDoc() {

    var filtrovalor = this.filtrarTipDoc.getRawValue()['combofiltro'];
    this.servi.getTipDoc('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipDoc = data;
      this.TituloTipDoc = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusTipDocs[0] = "Indicador";
      this.TabBusTipDocs[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Insertar un tipo de documento
  public InsertarTipDoc() {

    var datosvalo2 = this.InsertarGTipDoc.getRawValue()['textTipDoc'];
    var datosvalo1 = this.InsertarGTipDoc.getRawValue()['textIniTipDoc'];
    var cadena = { "tipo_documento": datosvalo2, "iniciales_tip_doc": datosvalo1 };

    this.servi.insertTipDoc(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGTipDoc.reset();

  }

  //Buscar un tipo de documento su id para editarlo
  buscarEditarTipDoc() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarATipDoc.getRawValue()['BuscarIdTipDoc'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getTipDoc('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiTipDocE = data;
      this.TituloTipDocEdit = "TIPO DE DOCUMENTO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de documento 
  public ActualizarTipDoc() {

    var nuevotipdoc = this.ActualizarATipDoc.getRawValue()['textnuevotipdoc'];
    var nuevoinitipdoc = this.ActualizarATipDoc.getRawValue()['textnuevoinicialestipdoc'];

    var cadena = { "id_tip_doc": this.BuscarEvalor, "tipo_documento": nuevotipdoc, "iniciales_tip_doc": nuevoinitipdoc };

    this.servi.updateTipDoc(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarATipDoc.reset();

  }

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
