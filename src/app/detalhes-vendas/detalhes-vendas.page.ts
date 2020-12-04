import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../models/pedido.module';

@Component({
  selector: 'app-detalhes-vendas',
  templateUrl: './detalhes-vendas.page.html',
  styleUrls: ['./detalhes-vendas.page.scss'],
})
export class DetalhesVendasPage implements OnInit {

  pedido = {} as Pedido
  constructor(private router: Router) {
    this.pedido = this.router.getCurrentNavigation().extras.state.pedidoHelp;
    console.log(this.pedido);
    console.log(this.pedido.itens)
   }

  ngOnInit() {
  }

}
