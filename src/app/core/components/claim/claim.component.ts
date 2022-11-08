import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Cliente, Reclamo, ReclamoVista, TipoReclamo, Usuario } from 'src/app/models/Models';
import { ClaimsService } from 'src/app/services/claims.service';
import { ClientsService } from 'src/app/services/clients.service';
import { TypeClaimService } from 'src/app/services/type-claim.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  public loading:boolean;
  //listReclamo: Reclamo[] = [];
  listReclamoVista: ReclamoVista[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  clienteAPI = new Cliente();
  usuario = new Usuario();
  reclamo = new ReclamoVista();
  reclamoAPI = new Reclamo();
  reclamoSelected = new ReclamoVista();
  
  // fechaReclamoS: string = '28/10/2022';
  // fechaReclamD: Date = new Date();
  // date1: Date = new Date();

  //reclamo = new Reclamo(0,"",new Date(), )

  listClients: Cliente[] = [];
  clientSelect?: any;
  listTypeClaim: TipoReclamo[] = [];
  tipoReclamoSelected?: any;
  listUser: Usuario[] = [];
  usuarioSelected:any;

  constructor(
    private _claimsService: ClaimsService, 
    private _clientService:ClientsService,
    private typeClaimService: TypeClaimService,
    private _userService: UsersService,
    private messageService: MessageService,
    private confirmService: ConfirmationService
    ) {
      this.loading = true;
     }

  ngOnInit(): void {
    this.getClaimsAll();

    this.getClienteALL();

    this.getTypeClaimAll();

    this.getUserAll();

    this.cols = [
      {field:"id", headers: "ID"},
      {field:"fechaReclamo", headers: "fechaReclamo"},
      {field:"comentario", headers: "Comentario"},
      {field:"descripcionReclamo", headers: "Tipo Reclamo"},
      {field:"nombreCliente", headers: "Nombre Cliente"},
      {field:"nombreUsuario", headers: "Nombre Usuario"}
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

  getClaimsAll() {
    this._claimsService.getAll()
      .subscribe((result: any) => {
        let reclamos: Reclamo[] = [];
        for (let i = 0; i < result.length; i++) {
          let claimR = result[i] as Reclamo;

          let claimVista = this.claimToClainVista(claimR);

          this.listReclamoVista.push(claimVista);

          this.loading = false;
        }
        //this.listReclamo = reclamos;
      });
  }

  claimToClainVista(claimR:Reclamo): ReclamoVista{

    let id = claimR.id;
    //let fechaReclam = claimR.fechaReclamo.toLocaleString();
    let fechaReclam = claimR.fechaReclamo;
    let coment = claimR.comentario;
    let desc = claimR.tipoReclamo.descripcion;
    let nomCli = claimR.cliente.nombres + " " + claimR.cliente.apellidos;
    let nomUser = claimR.usuario.nombres + " " + claimR.usuario.apellidos;
    let claimVista = new ReclamoVista(id, coment, fechaReclam, desc, nomCli, nomUser);
    claimVista.clienteID = claimR.cliente.id;
    claimVista.tipoReclamoID = claimR.tipoReclamo.id;
    claimVista.usuarioID = claimR.usuario.id;
    // const [year, month, day] = fechaReclam.split('/');

    // const date = new Date(+year, +month - 1, +day);

    // claimVista.fechaReclamoD = date;
    return claimVista;
  }


  save(){
    this.armarObjeto();
  }
  
  saveAPI(){
    this._claimsService.save(this.reclamoAPI).subscribe(
      (result: any) => {
        let claimR = result as Reclamo;
        let claimVista = this.claimToClainVista(claimR);
        this.validarReclamo(claimVista);
        this.messageService.add({severity:'success', summary:'Resultado', detail:'El reclamo se guardo correctamente'});
        this.displaySaveDialog = false;
      },
      error =>{
        console.log("error al grabar");
      });
  }

  armarObjeto() {
    this.reclamoAPI.id = this.reclamo.id;
    this.reclamoAPI.comentario = this.reclamo.comentario;
    this.reclamoAPI.fechaReclamo = this.reclamo.fechaReclamo;
    this.getClientID();
  }


  validarReclamo(reclamo:ReclamoVista){
    let index = this.listReclamoVista.findIndex((e) => e.id == reclamo.id);
    if(index != -1){
      this.listReclamoVista[index] = reclamo;
    }else{
      this.listReclamoVista.push(reclamo)
    }
  }


  showSaveDialog(editar: boolean){
    if(editar){
      if(this.reclamoSelected != null && this.reclamoSelected.id != 0){
        this.reclamo = this.reclamoSelected;
        this.clientSelect = this.reclamoSelected.clienteID;
        this.tipoReclamoSelected = this.reclamoSelected.tipoReclamoID;
        this.usuarioSelected = this.reclamoSelected.usuarioID;        
      }else{
        this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor seleccione un registro'});
        return;
      }
     
    }else{
      this.reclamo = new ReclamoVista();
      this.clientSelect = new Cliente();
      this.tipoReclamoSelected = new TipoReclamo();
      this.usuario = new Usuario();
    }
    this.displaySaveDialog = true;
  }


  delete() {
    if(this.reclamoSelected == null || this.reclamoSelected.id == null){
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor seleccione un registro'});    
      return;
    }

    this.confirmService.confirm({
      message: "¿Esta seguro que desea eliminar el reclamo?",
      accept: () =>{
        this._claimsService.delete(this.reclamoSelected.id)
        .subscribe((result:any) =>{
            this.messageService.add({
              severity:'success',
              summary: 'Resultado',
              detail: 'Usuario eliminado correctamente'
            });
            this.deleteObject(this.reclamoSelected.id);
          },error =>{
            console.log('error en eliminar');
            console.log(error);
          }
        )
      }
    });    
  }

  deleteObject(id: number) {
    let index = this.listReclamoVista.findIndex((e) => e.id == id);
    if (index != -1) {
      this.listReclamoVista.splice(index, 1);
    }
  }

  getClienteALL(){
    this._clientService.getAll()
         .subscribe( (result:any) =>{
           let client:Cliente[] = [];           
           for (let i = 0; i < result.length; i++) {
            let persona = result[i] as Cliente;  
            persona.nombreCompleto = persona.apellidos + " " + persona.nombres;     
            client.push(persona);  
           }
           this.listClients = client;
         });
  }

  getClientID(){
   return this._clientService.getClientID(this.clientSelect)
         .subscribe( (result:any) =>{
          this.clienteAPI = result;
          this.reclamoAPI.cliente = this.clienteAPI;
          this.getTypeClaimID();
         });
  }

  getTypeClaimAll() {
    this.typeClaimService.getAll()
      .subscribe((result: any) => {
        let typeClaim: TipoReclamo[] = [];
        for (let i = 0; i < result.length; i++) {
          let tipoCla = result[i] as TipoReclamo;
          typeClaim.push(tipoCla);
        }
        this.listTypeClaim = typeClaim;
      });
  }

  getTypeClaimID() {
    return this.typeClaimService.getTypeClaimID(this.tipoReclamoSelected)
          .subscribe( (result:any) =>{
           this.reclamoAPI.tipoReclamo = result;
           this.getUserID();
          });
   }


  getUserAll(){
    this._userService.getAll()
         .subscribe( (result:any) =>{
           let user:Usuario[] = [];           
           for (let i = 0; i < result.length; i++) {
            let persona = result[i] as Usuario;       
            user.push(persona);  
           }
           this.listUser = user;
         });
  }

  getUserID() {
    return this._userService.getUserID(this.usuarioSelected)
          .subscribe( (result:any) =>{
           this.reclamoAPI.usuario = result;
           this.saveAPI();
          });
   }

}
