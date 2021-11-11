import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicioNocturnoService {

  private Url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // Método Listar de los Tipos de documentos 
  getTipDocs(): Observable<any> {

    return this.http.get(this.Url + "/tipdoc", httpOptions);

  }

  // Método mostrar un solo Tipo de documento
  getTipDoc(id: any): Observable<any> {

    return this.http.get(this.Url + "/tipdoc" + id, httpOptions);

  }

  // Método para insertar un nuevo Tipo de documento 
  async insertTipDoc(TipDocD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipdoc", TipDocD, httpOptions).toPromise()
    });

  }

  // Método para modificar un  Tipo de documento
  async updateTipDoc(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipdoc", cadena, httpOptions).toPromise()
    });

  }

}