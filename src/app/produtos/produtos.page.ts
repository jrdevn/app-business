import { Component, OnInit } from '@angular/core';
import {GeralService} from '../api/geral.service';
import {Produto} from '../models/Produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produto = {} as Produto;
  produtos: Produto[];

  constructor(private geralService: GeralService) { }

  ngOnInit() {
    this.obtemProdutos();
  }

  obtemProdutos() {
    this.geralService.obterProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
      console.log(this.produtos[1].descricao);
    });
  }
}

 

