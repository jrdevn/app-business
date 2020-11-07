import { Estabelecimento } from './estabelecimento.module';

export class Usuario {
    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public tipoUsuario?: number,
        public estabelecimento? : number
    ){
        
    }
}