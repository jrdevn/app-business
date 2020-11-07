import { Component, OnInit } from '@angular/core';
import {GeralService} from '../api/geral.service';
import { Produto } from '../models/produto.module';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.page.html',
  styleUrls: ['./lancamento.page.scss'],
})
export class LancamentoPage implements OnInit {

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
