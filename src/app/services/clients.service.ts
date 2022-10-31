import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente, ITipoReclamo } from '../interfaces/Interfaces';
import { Cliente } from '../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  urlTipoReclamo = 'https://dswac-backend.herokuapp.com/tipoReclamo/all';
  urlCliente = 'https://dswac-backend.herokuapp.com/cliente/all';
  baseURL = 'https://dswac-backend.herokuapp.com'

  private clientList: ICliente[] = [
    {
      "identificacion": "123456790",
      "nombres": "Emilio",
      "apellidos": "Vera",
      "telefono": "0992121212",
      "correo": "emilio.vera@unl.edu.ec",
      "id": 1
    },
    {
      "identificacion": "1715851406",
      "nombres": "Giovanny",
      "apellidos": "Cholca",
      "telefono": "0994910959",
      "correo": "byron.cholca@unl.edu.ec",
      "id": 1
    },
    {
      "identificacion": "171596446",
      "nombres": "Cesia",
      "apellidos": "Menendez",
      "telefono": "0994910959",
      "correo": "cmenendez@unl.edu.ec",
      "id": 1
    }
  ];

  constructor(private http: HttpClient) {
    console.log("Servicios listo para usar");
    
  }
  
  getAll(): Observable<any>{
    return  this.http.get(this.baseURL + '/cliente/all');
  }

  save(cliente: Cliente):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.post(this.baseURL + "/cliente/save", JSON.stringify(cliente), {headers:headers});
  }


  delete(id:number) : Observable<any>{
    return this.http.delete(this.baseURL+"/cliente/delete/" + id)
  }








  getClient()  {
    return this.http.get('https://dswac-backend.herokuapp.com/cliente/all');
  }

  public getIClient()  {
    return this.http.get('https://dswac-backend.herokuapp.com/cliente/all')
    .subscribe(data => {
      console.log(data);
    });
  }

  getUsuario(){
    return this.http.get('https://dswac-backend.herokuapp.com/usuario/all');
  }

  getTipoReclamo(){
    return this.http.get(this.urlTipoReclamo);
  }

  getITipoReclamo(): Observable<ITipoReclamo> {
    //this.configUrl = `${environment.nasaUrl}/planetary/apod?api_key=${environment.nasaKey}`;
    return this.http.get<ITipoReclamo>(this.urlTipoReclamo);
  }

  getReclamo(){
    return this.http.get('https://dswac-backend.herokuapp.com/reclamo/all');
  }

  public getClientsALL(): ICliente[] {
    // this.http.get('https://restcountries.eu/rest/v2/lang/es')
    // .subscribe( data  => {
    //   console.log(data);
    // })

    // this.http.get('https://dswac-backend.herokuapp.com/cliente/all')
    // .subscribe( data  => {
    //   console.log(data);
    // });
    return this.clientList;
  }



}
