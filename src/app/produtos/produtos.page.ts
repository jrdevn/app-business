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
  
  constructor(private estabelecimentoService: EstabelecimentoService,
              private loginService: LoginService,
              private produtoService: ProdutoService,
              private navigate : Router,
              private alertController : AlertController) { }

  ngOnInit() {
    this.loginService.getUserInformation$.
      subscribe((data) => {
        this.usuarioLogado  = {
          tipoUsuario: data.tipoUsuario,
          estabelecimento: data.estabelecimento,
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
      if(this.usuarioLogado.estabelecimento && this.usuarioLogado.estabelecimento > 0 && nomeProduto) {
        this.produtoService.findByDescricao(this.usuarioLogado.estabelecimento, nomeProduto).subscribe(data => {
          this.produtos = null; 
          this.produtos = data;
        }, (error: HttpErrorResponse) => {
          this.notificarMensagemErro(error);
        });
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

  backToDashborard() {
    this.navigate.navigateByUrl('/admin-usuario');
  }
}

 

