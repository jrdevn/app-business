import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../api/services/login.service';
import { AppComponent } from '../app.component';
import { Usuario } from '../models/usuario.module';
import { LoadingController } from '@ionic/angular';
import { PedidoService } from '../api/services/pedido.service';
import { Pedido } from '../models/pedido.module';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  logged: boolean = false;
  usuarioLogado : Usuario;
  pedido : Array<Pedido> = [];
  
  constructor(private router:Router,
              private loginService : LoginService,
              private loadCtrl: LoadingController,
              private pedidoService: PedidoService) {}

  ngOnInit() {
    this.loginService.getUserInformation$.subscribe(val => {
      this.usuarioLogado = val; /* implementar loading */
    });

    this.pedidoService.findAllByIdEstabelecimento(1).subscribe(data => {
      this.pedido = data;
    })
  }


  detalhesVendas() {
    this.router.navigateByUrl("/detalhes-vendas");
  }

}
