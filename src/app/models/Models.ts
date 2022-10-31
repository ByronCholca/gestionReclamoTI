export class Cliente {
    constructor(public id: number = 0,
        public identificacion: string = '',
        public nombres: string = '', 
        public apellidos: string = '',
        public telefono: string = '',
         public correo: string = '') {
    }
}

export class TipoReclamo {
    constructor(public id: number, public descripcion: string) {
    }
}

export class Usuario {
    constructor(public id: number,
        public identificacion: string,
        public codigoUsuario: string,
        public nombres: string,
        public apellidos: string,
        public telefono: string,
        public correo: string) {

    }
} 