import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoReclamo } from '../models/Models';

@Injectable({
  providedIn: 'root'
})
export class TypeClaimService {

  baseURL = 'https://dswac-backend.herokuapp.com'

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any>{
    return  this.http.get(this.baseURL + '/tipoReclamo/all');
  }

  save(tipoReclamo: TipoReclamo):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.post(this.baseURL + "/tipoReclamo/save", JSON.stringify(tipoReclamo), {headers:headers});
  }

  delete(id:number) : Observable<any>{
    return this.http.delete(this.baseURL+"/tipoReclamo/delete/" + id)
  }


  getTypeClaimID(id:any){
    return this.http.get(this.baseURL+"/tipoReclamo/find/" + id);
  }

}
