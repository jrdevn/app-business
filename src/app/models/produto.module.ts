import { Estabelecimento } from './estabelecimento.module';

export class Produto {
    constructor(
        public id?: string,
        public descricao?: string,
        public valor?: number,
        public estabelecimento? : Estabelecimento
    ){  
    }
}