import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {GeralService} from '../api/geral.service';
import { LoginService } from '../api/services/login.service';
import { ProdutoService } from '../api/services/produtos.service';
import {Produto} from '../models/produto.module';
import * as moment from 'moment';
import { MomentUtils } from '../utils/moment.util';
import { Router } from '@angular/router';
import { TIPOUSUARIO } from '../constants/tipos-usuario.contants';
import { AlertController } from '@ionic/angular';
import { EstabelecimentoService } from '../api/services/estabelecimento.service';
import { Estabelecimento } from '../models/estabelecimento.module';
import { Usuario } from '../models/usuario.module';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produto = {} as Produto;
  produtos: Produto[];
  estabelecimentos : Estabelecimento[];
  usuarioLogado: Usuario;
  estabelecimentoSelecionado: number;
  nomeProdutoFiltro: string;
  
  constructor(private estabelecimentoService: EstabelecimentoService,
              private loginService: LoginService,
              private produtoService: ProdutoService,
              private navigate : Router,
              private alertController : AlertController) { }

  ngOnInit() {
    this.loginService.getUserInformation$.
      subscribe((data) => {
        this.usuarioLogado  = {
          perfil_id: data.tipoUsuario,
          estabelecimento_id: data.estabelecimento,
          nome: data.nome,
        }

        if(data.tipoUsuario != TIPOUSUARIO.ADMIN) {
          this.getProdutos(data.estabelecimento);      
        } else {
          this.getEstabelecimentos();
        }
    });
  }

  getProdutos(estabelecimentoId: number) {
    if(estabelecimentoId && estabelecimentoId > 0) {
        this.produtoService.findAll(estabelecimentoId).subscribe(data => {
          this.produtos = data;
        }, (error: HttpErrorResponse) => {
          this.notificarMensagemErro(error);
        });
      }
    }

    getProdutoByNome(nomeProduto : string) {
      this.produtos = null;
      if(this.usuarioLogado.perfil_id == TIPOUSUARIO.ADMIN) {
        console.log(this.nomeProdutoFiltro);
        if(this.estabelecimentoSelecionado && this.nomeProdutoFiltro == null ||
           this.estabelecimentoSelecionado && this.nomeProdutoFiltro == undefined ||
           this.estabelecimentoSelecionado && this.nomeProdutoFiltro == "") {
             
             this.produtoService.findAll(this.estabelecimentoSelecionado).subscribe(data => {
              this.produtos = null; 
              this.produtos = data;
             });
           }
        else if(this.nomeProdutoFiltro  && this.nomeProdutoFiltro.length > 0 &&
                this.estabelecimentoSelecionado && this.estabelecimentoSelecionado > 0) {

          this.produtoService.findByDescricao(this.estabelecimentoSelecionado, this.nomeProdutoFiltro).subscribe(data => {
          this.produtos = null; 
          this.produtos = data;
        }, (error: HttpErrorResponse) => {
          this.notificarMensagemErro(error);
          });
        } else if(this.estabelecimentoSelecionado == null || this.estabelecimentoSelecionado == undefined) {
            this.nomeProdutoFiltro = null;
            this.alertEstabelecimentoObrigatorio("Por favor! Selecione o estabelecimento.")
        }
      } else {
        // perfil vendedor
        if(this.nomeProdutoFiltro == null || this.nomeProdutoFiltro == undefined || this.nomeProdutoFiltro == "") {
            this.produtoService.findAll(this.usuarioLogado.estabelecimento_id).subscribe(data => {
             this.produtos = null; 
             this.produtos = data;
            });
          }
        else if(this.nomeProdutoFiltro && this.nomeProdutoFiltro.length > 0) {

         this.produtoService.findByDescricao(this.usuarioLogado.estabelecimento_id, this.nomeProdutoFiltro).subscribe(data => {
         this.produtos = null; 
         this.produtos = data;
       }, (error: HttpErrorResponse) => {
         this.notificarMensagemErro(error);
         });
       } 
      }
    }

  getEstabelecimentos() {
    this.estabelecimentoService.findAll().subscribe(data => {
      this.estabelecimentos = data;
    }, (error: HttpErrorResponse) => {
      this.notificarMensagemErro(error);
    });
  }

  async notificarMensagemErro(error: HttpErrorResponse) {
    const alert = await this.alertController.create({
      header: error.error.error,
      subHeader: String(error.status),
      message: error.error.message,
      cssClass: 'alertDanger',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertEstabelecimentoObrigatorio(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  backToDashborard() {
    this.navigate.navigateByUrl('/admin-usuario');
  }
}

 

