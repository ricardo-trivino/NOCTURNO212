import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

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

  private extractData(res: Response) {

    let body = JSON.parse('' + res);
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)

    };
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // SERVICIO CRUD DE TIPOS DE DOCUMENTOS
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

  // Método Listar de los Tipos de documentos 
  getTipDocs(): Observable<any> {

    return this.http.get(this.Url + "/tipdoc", httpOptions);

  }

  //-------------------------------------------------------------
  // Método mostrar un solo Tipo de documento
  getTipDoc(id: any): Observable<any> {

    return this.http.get(this.Url + "/tipdoc" + id, httpOptions);

  }

  /*
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // SERVICIO CRUD DE TIPOS DE DOCUMENTOS
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
    // Método Listar de los Tipos de documentos
    getTipDocs(): Observable<any> {
  
      //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);
  
      return this.http.get(this.Url + "/tipdoc", httpOptions).pipe(
        map(this.extractData)
      );
    }
  
    //-------------------------------------------------------------
    // Método mostrar un solo Tipo de documento
  
    getTipDoc(id): Observable<any> {
  
      return this.http.get(this.Url + "/tipdoc" + id, httpOptions).pipe(
        map(this.extractData));
    }
  
    //-------------------------------------------------------------
    // Método para insertar un nuevo Tipo de documento
  
    async insertTipDoc(TipDocD): Promise<any> {
  
      //console.log(TipDocD, this.Url+"/tipdoc")
  
      return new Promise((resolve, reject) => {
        this.http.post(this.Url + "/tipdoc", TipDocD, httpOptions).toPromise()
      });
    }
  
    //-------------------------------------------------------------
    // Método para modificar un  Tipo de documento
  
    async updateTipDoc(cadena): Promise<any> {
  
      //console.log("33 " + cadena)
      //console.log("tales 60  " + cadena.id_tip_doc + " - " + cadena.tipo_documento+ " - " +  cadena.iniciales_tip_doc, this.Url + "/tipdoc")
  
  
      return new Promise((resolve, reject) => {
        this.http.put(this.Url + "/tipdoc", cadena, httpOptions).toPromise()
      });
    }
  
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  */
}