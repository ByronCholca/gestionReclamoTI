import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Cliente, Reclamo, ReclamoVista, Usuario } from 'src/app/models/Models';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  //listReclamo: Reclamo[] = [];
  listReclamoVista: ReclamoVista[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  cliente = new Cliente();
  usuario = new Usuario();
  reclamo = new ReclamoVista();
  reclamoSelected = new ReclamoVista();
  fechaReclamoS: string = '28/10/2022';
  fechaReclamD: Date = new Date();
  date1: Date = new Date();

  //reclamo = new Reclamo(0,"",new Date(), )

  constructor(
    private _claimsService: ClaimsService, 
    private messageService: MessageService,
    private confirmService: ConfirmationService
    ) { }

  ngOnInit(): void {
    this.getClaimsAll();

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
        console.log(result);
        let reclamos: Reclamo[] = [];
        for (let i = 0; i < result.length; i++) {
          let claimR = result[i] as Reclamo;

          let claimVista = this.claimToClainVista(claimR);

          this.listReclamoVista.push(claimVista);
        }
        //this.listReclamo = reclamos;
        console.log("listReclamo");
      });
  }

  claimToClainVista(claimR:Reclamo): ReclamoVista{

    let id = claimR.id;
    let fechaReclam = '25/09/2022';
    // = claimR.fechaReclamo;
    
    let coment = claimR.comentario;
    let desc = claimR.tipoReclamo.descripcion;
    let nomCli = claimR.cliente.nombres + " " + claimR.cliente.apellidos;
    let nomUser = claimR.usuario.nombres + " " + claimR.usuario.apellidos;
    let claimVista = new ReclamoVista(id, coment, fechaReclam, desc, nomCli, nomUser);

    return claimVista;
  }


  save(){
    console.log('guardando reclamo');
    console.log(this.reclamo);
    let reclam = new Reclamo();
    this._claimsService.save(reclam).subscribe(
    (result: any) => {
      console.log(result);
      let claimR = result as Reclamo;
      let claimVista = this.claimToClainVista(claimR);
      this.validarReclamo(claimVista);
      this.messageService.add({severity:'success', summary:'Resultado', detail:'El reclamo se guardo correctamente'});
      this.displaySaveDialog = false;
    },
    error =>{
      console.log("error");
    });
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
      }else{
        this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor seleccione un registro'});
        return;
      }
     
    }else{
      this.reclamo = new ReclamoVista();
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
            console.log('resultado eliminar');
            console.log(result);
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

  deleteObject(id:number){
    let index = this.listReclamoVista.findIndex((e)=> e.id == id);
    if(index != -1){
      this.listReclamoVista.splice(index,1);
    }
  }



}
