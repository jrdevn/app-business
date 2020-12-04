import { Produto } from './produto.module';
 import {Itens}    from './itens.module';
import { Estabelecimento } from './estabelecimento.module';
import { Usuario } from './usuario.module';

export class Pedido {
    constructor(
        public dataVenda?: String,
        public estabelecimentoId?: Number,
        public usuarioLogadoId?: Number,
        public itens?: Itens[],
        public valorTotal?: number
    ){
        
    }
}