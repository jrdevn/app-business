import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../api/services/login.service';
import { AppComponent } from '../app.component';
import { Usuario } from '../models/usuario.module';
import { AlertController, LoadingController } from '@ionic/angular';
import { PedidoService } from '../api/services/pedido.service';
import { Pedido } from '../models/pedido.module';
import { EstabelecimentoService } from '../api/services/estabelecimento.service';
import { Estabelecimento } from '../models/estabelecimento.module';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  logged: boolean = false;
  usuarioLogado : Usuario;
  pedidos : Pedido[];
  pedido = {} as Pedido
  estabelecimentoSelecionado: number;
  estabelecimentos : Estabelecimento[];
  
  constructor(private router:Router,
              private loginService : LoginService,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController,
              private pedidoService: PedidoService,
              private estabelecimentoService: EstabelecimentoService) {}

  ngOnInit() {
    this.loginService.getUserInformation$.subscribe(data => {
      this.usuarioLogado  = {
        perfil_id: data.tipoUsuario,
        estabelecimento_id: data.estabelecimento,
        nome: data.nome
      }
    });

    this.getEstabelecimentos();
    this.obtemPedidos(this.usuarioLogado.estabelecimento_id);
  }

   getPedidos(estabelecimentoId: number) {
    if(estabelecimentoId && estabelecimentoId > 0) {
        this.pedidoService.findAllByIdEstabelecimento(estabelecimentoId).subscribe(data => {
          this.pedidos = data;
          this.pedidos.forEach(pedido => {
            pedido.valorTotal = 0;
            pedido.itens.forEach(item => {
              pedido.valorTotal = pedido.valorTotal + item.preco;
            });
          });
        }, (error: HttpErrorResponse) => {
          this.presentAlert("Erro ao carregar as vendas: " + error);
        });
      }
    }

   detalhesVendas(pedido: Pedido) {
    this.router.navigate(['/detalhes-vendas'], { 
      state: { pedidoHelp: pedido }
    });
   }

  getEstabelecimentos() {
    this.estabelecimentoService.findAll().subscribe(data => {
      this.estabelecimentos = data;
    }, (error: HttpErrorResponse) => {
      this.presentAlert("Erro ao carregar estabelecimentos: " + error);
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

  obtemPedidos(id: number) {
    this.pedidoService.findAllByIdEstabelecimento(id).subscribe(data => {
      this.pedidos = data;
      this.pedidos.forEach(pedido => {
        pedido.valorTotal = 0;
        pedido.itens.forEach(item => {
          pedido.valorTotal = pedido.valorTotal + item.preco;
        });
      });
    })
  }

}
