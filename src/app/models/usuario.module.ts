import { Estabelecimento } from './estabelecimento.module';

export class Usuario {
    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public perfil_id?: number,
        public estabelecimento_id? : number,
        public senha?: string,
        public telefone?: number
    ){
        
    }
}