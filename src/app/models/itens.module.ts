import { Produto } from './produto.module';


export class Itens {
    constructor(
        public quantidade?: number,
        public preco?: number,
        public produto?: Produto
    ){
        
    }
}