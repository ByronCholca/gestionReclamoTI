import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Models';
import { MenuItem, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listUser: Usuario[] = [];
  cols:any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  usuario: Usuario = {
    id: 0,
    codigoUsuario:'',
    identificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };

  usuarioSelected:Usuario= {
    id: 0,
    codigoUsuario:'',
    identificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };


  constructor(private _userService: UsersService, private messageService: MessageService ) { }

  ngOnInit(): void {
    this.getUserAll();

    this.cols = [
      {field:"id", headers: "ID"},
      {field:"codigoUsuario", headers: "codigoUsuario"},
      {field:"identificacion", headers: "Identificacion"},
      {field:"nombres", headers: "Nombres"},
      {field:"apellidos", headers: "Apellidos"},
      {field:"telefono", headers: "Telefono"},
      {field:"correo", headers: "Correo"},
    ];


    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false)
      }, {
        label: "Editar",
        icon: 'pi pi-fw pi-pencil',
        command: () => this.showSaveDialog(true)
      }
    ]

  }


  showSaveDialog(editar: boolean){
    if(editar){
      if(this.usuarioSelected != null && this.usuarioSelected.id != 0){
        this.usuario = this.usuarioSelected;
      }else{
        this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor seleccione un registro'});
        return;
      }
     
    }else{
      this.usuario= new Usuario();
    }
    this.displaySaveDialog = true;
  }

  getUserAll(){
    this._userService.getAll()
         .subscribe( (result:any) =>{
          console.log(result);
           let user:Usuario[] = [];           
           for (let i = 0; i < result.length; i++) {
            let persona = result[i] as Usuario;       
            user.push(persona);  
           }
           this.listUser = user;
         });
  }


  save(){
    console.log('guardando');
    console.log(this.usuario);
    this._userService.save(this.usuario).subscribe(
    (result: any) => {
      console.log(result);
      let miusuario = result as Usuario;
      this.validarUsuario(miusuario)
      this.messageService.add({severity:'success', summary:'Resultado', detail:'El usuario se guardo correctamente'});
      this.displaySaveDialog = false;
    },
    error =>{
      console.log("error");
    }
    );
  }


  
  validarUsuario(usuario:Usuario){
    let index = this.listUser.findIndex((e) => e.id == usuario.id);
    if(index != -1){
      this.listUser[index] = usuario;
    }else{
      this.listUser.push(usuario)
    }
  }


}
