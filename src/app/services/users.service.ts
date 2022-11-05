import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = 'https://dswac-backend.herokuapp.com'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return  this.http.get(this.baseURL + '/usuario/all');
  }

  save(usuario: Usuario):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.post(this.baseURL + "/usuario/save", JSON.stringify(usuario), {headers:headers});
  }


  delete(id:number) : Observable<any>{
    return this.http.delete(this.baseURL+"/usuario/delete/" + id);
  } 


}
