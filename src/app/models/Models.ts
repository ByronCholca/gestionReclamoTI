import { DatePipe } from "@angular/common";

export class Cliente {
   
    id: number;
    identificacion: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    correo: string;

    constructor(id: number = 0,
        identificacion: string = '',
        nombres: string = '',
        apellidos: string = '',
        telefono: string = '',
        correo: string = '') {
        this.id = id;
        this.identificacion = identificacion;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.correo = correo;
    }
}

export class TipoReclamo {
    constructor(public id: number = 0, public descripcion: string  = '') {
    }
}

export class Usuario {
    constructor(public id: number = 0,
        public identificacion: string = '',
        public codigoUsuario: string = '',
        public nombres: string = '',
        public apellidos: string = '',
        public telefono: string = '',
        public correo: string = '') {

    }
} 


export class Reclamo {
    id: number;
    comentario: string;
    fechaReclamo: Date;
    cliente: Cliente;
    usuario: Usuario;
    tipoReclamo: TipoReclamo;

    constructor(id: number = 0, comentario: string = '', fechaReclamo: Date = new Date()
        //, usuario:Usuario, tipoReclamo:TipoReclamo
    ) {
        this.id = id;
        this.comentario = comentario;
        this.fechaReclamo = fechaReclamo;
        this.cliente = new Cliente;
        this.usuario = new Usuario;
        this.tipoReclamo = new TipoReclamo;
    }
}

export class ReclamoVista {
    id: number;
    fechaReclamo: string;
    comentario: string;
    descripcionReclamo: string = '';
    nombreCliente: string = '';
    nombreUsuario: string = '';


    constructor(id: number = 0, comentario: string = '', fechaReclamo: string = '', descripcionReclamo: string = '',
        nombreCliente: string = '', nombreUsuario: string = '') {
        this.id = id;
        this.fechaReclamo = fechaReclamo;
        this.comentario = comentario;
        this.descripcionReclamo = descripcionReclamo;
        this.nombreCliente = nombreCliente;
        this.nombreUsuario = nombreUsuario;
    }
}