import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {GeralService} from '../api/geral.service';
import { EstabelecimentoService } from '../api/services/estabelecimento.service';
import { Produto } from '../models/produto.module';
import { Estabelecimento} from '../models/estabelecimento.module';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdutoService } from '../api/services/produtos.service';
import { Router } from '@angular/router';
import { Itens } from '../models/itens.module';
@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.page.html',
  styleUrls: ['./lancamento.page.scss'],
})
export class LancamentoPage implements OnInit {

  produto = {} as Produto;
  itens: Map<Produto, number> = new Map();
  itensPedido: Itens[]
  produtos: Produto[];
  Idestabelecimento : number;
  valorTotal: number = 0;
  precoUnitario: number =0;




  constructor(private alertCtrl: AlertController,
              private produtoService: ProdutoService,
              private _router: Router
              ) { 
     
     //this.itensPedido = new Itens();
  }

  ngOnInit() {
    this.obtemProdutos();
  }

  obtemProdutos() {
    this.Idestabelecimento = this._router.getCurrentNavigation().extras.state.estabelecimentoId;
    this.produtoService.findAll(this.Idestabelecimento).subscribe(data => {
      this.produtos = data;
      this.inicializaItens();
    }, (error: HttpErrorResponse) => {
      //this.notificarMensagemErro(error);
      console.log(error);
    });
  }

  alterarQuantidade(quantidade: number, retirar: boolean) : number {
    if(!retirar){
      quantidade++;
      return quantidade;
    }
    if(quantidade > 0){
      quantidade--;
    }
    return quantidade;
  }

  selecionar(produto: Produto, retirar: boolean){
    let qtd = this.getQuantidade(produto);
    let newQtd = this.alterarQuantidade(qtd, retirar);
    this.itens.set(produto, newQtd);
    this.calculaPreco(produto,retirar,newQtd,qtd);
    this.calcularValorTotal();
  }

  getQuantidade(produtoId: Produto) : number{
    return this.itens.get(produtoId);
  }

  calcularValorTotal() {
    this.valorTotal = 0;
    this.produtos.forEach(produto => {
      let qtd = this.itens.get(produto);
      this.valorTotal += qtd;
    });
    console.log(this.itens);
  }

  calculaPreco(produto: Produto, operacao: boolean, qtd: number, qtdOld:number) {
    if (!operacao) {
      this.precoUnitario +=  (produto.valor);
    }
    else if (qtd != 0 || qtdOld != 0)  {
      this.precoUnitario -= (produto.valor);
      if (this.precoUnitario < 0) {
        this.precoUnitario = 0;
      }
    }
  }

  inicializaItens(){
    this.produtos.forEach(produto => {
      this.itens.set(produto, 0);
    });

  }

  salvarPedido() {
    if (this.valorTotal == 0) {
        this.presentAlert("Nenhum produto selecionado!!")
    }
    else {

    }
  }

  montaObjeto() {
    this.produtos.forEach(produto => {
      this.itens.forEach((value,key) => {
       if (value > 0 && produto === key){
          this.itensPedido.push(new Itens(value, produto.valor,))
       }
      });
    });
  }

  async presentAlert(mensagem: string) {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Atenção!!',
      //subHeader: 'Subtitle',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

}




