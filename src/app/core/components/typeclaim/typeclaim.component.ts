import { Component, OnInit } from '@angular/core';
import { TipoReclamo } from 'src/app/models/Models';
import { MenuItem, MessageService } from 'primeng/api';                                                                                                                                                                         
import { TypeClaimService } from 'src/app/services/type-claim.service';

@Component({
  selector: 'app-typeclaim',
  templateUrl: './typeclaim.component.html',
  styleUrls: ['./typeclaim.component.css']
})
export class TypeclaimComponent implements OnInit {

  listTypeClaim: TipoReclamo[] = [];
  cols:any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

  tipoReclamo: TipoReclamo = {
    id: 0,
    descripcion:'',
  }

  tipoReclamoSelected: TipoReclamo = {
    id: 0,
    descripcion:'',
  }

  constructor(private typeClaimService: TypeClaimService, private messageService: MessageService ) { }


  ngOnInit(): void {
    this.getUserAll();

    this.cols = [
      {field:"id", headers: "ID"},
      {field:"descripcion", headers: "descripcion"},
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
      if(this.tipoReclamoSelected != null && this.tipoReclamoSelected.id != 0){
        this.tipoReclamo = this.tipoReclamoSelected;
      }else{
        this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor seleccione un registro'});
        return;
      }
     
    }else{
      this.tipoReclamo= new TipoReclamo();
    }
    this.displaySaveDialog = true;
  }

  getUserAll(){
    this.typeClaimService.getAll()
         .subscribe( (result:any) =>{
          console.log(result);
           let typeClaim:TipoReclamo[] = [];           
           for (let i = 0; i < result.length; i++) {
            let tipoCla = result[i] as TipoReclamo;       
            typeClaim.push(tipoCla);  
           }
           this.listTypeClaim = typeClaim;
         });
  }

  save(){
    console.log('guardando');
    console.log(this.tipoReclamo);
    this.typeClaimService.save(this.tipoReclamo).subscribe(
    (result: any) => {
      console.log(result);
      let mytipoReclamo = result as TipoReclamo;
      this.validarTipoReclamo(mytipoReclamo)
      this.messageService.add({severity:'success', summary:'Resultado', detail:'El tipo de reclamo se guardo correctamente'});
      this.displaySaveDialog = false;
    },
    error =>{
      console.log("error de Tipo Reclamo");
    }
    );
  }

  validarTipoReclamo(tipoReclamo:TipoReclamo){
    let index = this.listTypeClaim.findIndex((e) => e.id == tipoReclamo.id);
    if(index != -1){
      this.listTypeClaim[index] = tipoReclamo;
    }else{
      this.listTypeClaim.push(tipoReclamo)
    }
  }

}
