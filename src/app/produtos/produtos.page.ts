import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {GeralService} from '../api/geral.service';
import { LoginService } from '../api/services/login.service';
import { ProdutoService } from '../api/services/produtos.service';
import {Produto} from '../models/produto.module';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produto = {} as Produto;
  produtos: Produto[];

  constructor(private geralService: GeralService,
              private loginService: LoginService,
              private produtoService: ProdutoService) { }

  ngOnInit() {
    //this.obtemProdutos();
    this.loginService.getUserInformation$.
    subscribe((data) => {
      let profile = {
        estabelecimento: data.estabelecimento,
        tipoUsuario: data.tipoUsuario,
        nome: data.nome,
      }
      this.getProdutos(data.estabelecimento);      
    })
  }

  getProdutos(idEstabelecimento) {
    this.produtoService.findAll(idEstabelecimento).subscribe(data => {
      this.produtos = data;
    }, (error: HttpErrorResponse) => {
     // AlertUtils.presentAlert(error); // @TODO implementar notification
    });
  }
  obtemProdutos() {
    this.geralService.obterProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
      console.log(this.produtos[1].descricao);
    });
  }
}

 

