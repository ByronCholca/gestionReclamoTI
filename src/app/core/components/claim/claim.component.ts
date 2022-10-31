import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/Models';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  listUser: Usuario[] = [];
  cols:any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  usuario: Usuario = {
    id: 0,
    identificacion: '',
    codigoUsuario: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  }

  usuarioSelected: Usuario = {
    id: 0,
    identificacion: '',
    codigoUsuario: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
