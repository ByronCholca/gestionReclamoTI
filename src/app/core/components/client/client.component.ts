import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Cliente } from 'src/app/models/Models';
import { ClientsService} from '../../../services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public loading:boolean;
  forma!: FormGroup;
  listClients: Cliente[] = [];
  cols:any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  cliente: Cliente = {
    id: 0,
    identificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };

  selectedClient:Cliente= {
    id: 0,
    identificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };

  clickMessage = "";

  constructor(
    private _clientService:ClientsService,
    private messageService: MessageService,
    private confirmService: ConfirmationService) {
    this.loading = true;
   }

  handleClick($event: any) {
    console.log("handleClick");
    this.clickMessage = "Has hecho clic en botón";
  }


showSaveDialog(editar: boolean){
  if(editar){
    if(this.selectedClient != null && this.selectedClient.id != 0){
      this.cliente = this.selectedClient;
    }else{
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor seleccione un registro'});
      return;
    }
   
  }else{
    this.cliente = new Cliente();
  }
  this.displaySaveDialog = true;
}

  ngOnInit(): void {

    this.getClienteALL();

    this.cols = [
      {field:"id", headers: "ID"},
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
      }, {
        label: "Eliminar",
        icon: 'pi pi-fw pi-times',
        command: () => this.delete()
      }
    ]
  }

  getClienteALL(){
    this._clientService.getAll()
         .subscribe( (result:any) =>{
          console.log(result);
           let client:Cliente[] = [];           
           for (let i = 0; i < result.length; i++) {
            let persona = result[i] as Cliente;       
            client.push(persona);  
            this.loading = false;
           }
           this.listClients = client;
         });
  }


  save(){
    console.log('guardando');
    console.log(this.cliente);
    this._clientService.save(this.cliente).subscribe(
    (result: any) => {
      console.log(result);
      let micliente = result as Cliente;
      this.validarCliente(micliente)
      this.messageService.add({severity:'success', summary:'Resultado', detail:'El cliente se guardo correctamente'});
      this.displaySaveDialog = false;
    },
    error =>{
      console.log("error");
    }
    );
  }


  validarCliente(cliente:Cliente){
    let index = this.listClients.findIndex((e) => e.id == cliente.id);
    if(index != -1){
      this.listClients[index] = cliente;
    }else{
      this.listClients.push(cliente)
    }
  }

deleteObject(id:number){
  let index = this.listClients.findIndex((e)=> e.id == id);
  if(index != -1){
    this.listClients.splice(index,1);
  }
}

  delete(){
    console.log('eliminar');
    
    if(this.selectedClient == null || this.selectedClient.id == null || this.selectedClient.id == 0){
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor seleccione un registro'});    
      return;
    }

    this.confirmService.confirm({
      message: "¿Esta seguro que desea eliminar el registro?",
      accept: () =>{
        this._clientService.deleteOK(this.selectedClient.id).subscribe(
          (result:any) =>{
            console.log('resultado eliminar');
            console.log(result);
            this.messageService.add({
              severity:'success',
              summary: 'Resultado',
              detail: 'Persona eliminada correctamente'
            });
            this.deleteObject(this.selectedClient.id);
          },error =>{
            console.log('error en eliminar');
            console.log(error);
          }
        )
      }
    });    
  }

}
