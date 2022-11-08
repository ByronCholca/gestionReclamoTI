import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  baseURL = 'https://dswac-backend.herokuapp.com'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return  this.http.get(this.baseURL + '/reclamo/all');
  }

  delete(id:number) : Observable<any>{
    return this.http.delete(this.baseURL+"/reclamo/delete/" + id);
  }

  save(reclamo: Reclamo):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.post(this.baseURL + "/reclamo/save", JSON.stringify(reclamo), {headers:headers});
  }

}
