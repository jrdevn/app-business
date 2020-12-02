import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {GeralService} from '../api/geral.service';
import { EstabelecimentoService } from '../api/services/estabelecimento.service';
import { Produto } from '../models/produto.module';
import { Estabelecimento} from '../models/estabelecimento.module';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdutoService } from '../api/services/produtos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.page.html',
  styleUrls: ['./lancamento.page.scss'],
})
export class LancamentoPage implements OnInit {

  produto = {} as Produto;
  produtos: Produto[];
  Idestabelecimento : number


  constructor(private alertCtrl: AlertController,
              private produtoService: ProdutoService,
              private _router: Router
              ) { 
     
  }

  ngOnInit() {
    this.obtemProdutos();
  }

  obtemProdutos() {
    this.Idestabelecimento = this._router.getCurrentNavigation().extras.state.estabelecimentoId;
    this.produtoService.findAll(this.Idestabelecimento).subscribe(data => {
      this.produtos = data;
    }, (error: HttpErrorResponse) => {
      //this.notificarMensagemErro(error);
      console.log(error);
    });
  }

  }




