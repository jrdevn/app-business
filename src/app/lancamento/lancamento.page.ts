import { Component, OnInit } from '@angular/core';
import { AlertController, IonItem, LoadingController } from '@ionic/angular';
import {GeralService} from '../api/geral.service';
import { EstabelecimentoService } from '../api/services/estabelecimento.service';
import { Produto } from '../models/produto.module';
import { Estabelecimento} from '../models/estabelecimento.module';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdutoService } from '../api/services/produtos.service';
import { Router } from '@angular/router';
import { Itens } from '../models/itens.module';
import { Pedido } from '../models/pedido.module';
import { LoginService } from '../api/services/login.service';
import { Usuario } from '../models/usuario.module';
import { MomentUtils } from '../utils/moment.util';
import * as moment from 'moment';
import { PedidoService } from '../api/services/pedido.service';
@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.page.html',
  styleUrls: ['./lancamento.page.scss'],
})
export class LancamentoPage implements OnInit {

  produto = {} as Produto;
  itens: Map<Produto, number> = new Map();
  itensPedido: Array<Itens> = [];
  produtos: Produto[];
  Idestabelecimento : number;
  valorTotal: number = 0;
  precoUnitario: number =0;
  pedido: Pedido;
  usuarioLogado: Usuario;

  constructor(private alertCtrl: AlertController,
              private produtoService: ProdutoService,
              private _router: Router,
              private loginService: LoginService,
              private pedidoService: PedidoService,
              private loadCtrl: LoadingController

              ) { 
     
  }

  ngOnInit() {
    this.getEstabelecimentoId();
    this.obtemProdutos();
    this.obtemUsuario()
  }

  async obtemProdutos() {
    let loading =  await this.loadCtrl.create({
      message: "Buscando produtos"
    });
    loading.present();
    this.produtoService.findAll(this.Idestabelecimento).subscribe(data => {
      loading.dismiss();
      this.produtos = data;
      if (this.produtos.length == 0) {
        this.presentAlert("Favor cadastrar produtos para esse estabelecimento!!");
        this._router.navigateByUrl('/home');
      }
      else {
        this.inicializaItens();
      }
    }, (error: HttpErrorResponse) => {
      //this.notificarMensagemErro(error);
      loading.dismiss();
      this.presentAlert("Erro, favor tentar novamente: " + error);
      this._router.navigateByUrl('/home');
    });
  }

  getEstabelecimentoId() {
    this.Idestabelecimento = this._router.getCurrentNavigation().extras.state.estabelecimentoId;
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
      let dataHoje = new Date();
      this.montaItens();
      this.pedido = new Pedido();
      console.log(this.Idestabelecimento);
      this.pedido.dataVenda = moment().format();
      this.pedido.estabelecimentoId = this.Idestabelecimento;
      this.pedido.itens = this.itensPedido;
      this.pedido.usuarioLogadoId = this.usuarioLogado.id;
      console.log(this.pedido);
      this.gravarPedido(this.pedido);
    }
  }

  async gravarPedido(pedido: Pedido) {
    let loading =  await this.loadCtrl.create({
      message: "Salvando pedido"
    });
    loading.present();
    this.pedidoService.create(pedido).subscribe(data => {
      loading.dismiss();
      this.presentAlert("Pedido cadastrado!")
      this._router.navigateByUrl('/home');
    }, (error: HttpErrorResponse) => {
      loading.dismiss();
      this.presentAlert("Algo deu errado com o seu pedido: " + error); 
      this._router.navigateByUrl('/home');
     });

  }

  montaItens() {
    console.log(this.itens);
      this.itens.forEach((value,key) => {
       if (value > 0){
          let customItens = new Itens();
          let valorHelp = value * key.valor; 
          //delete key.estabelecimento;
          //delete key.status;
          //delete key.valor;
          customItens.quantidade = value;
          customItens.preco = valorHelp;
          customItens.produto = key;
          this.itensPedido.push(customItens);
       }
      });
    console.log(this.itensPedido);
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

  obtemUsuario() {
    this.loginService.getUserInformation$.
    subscribe((data) => {
      this.usuarioLogado  = {
        id: data.id,
      }
  });
  }
}




