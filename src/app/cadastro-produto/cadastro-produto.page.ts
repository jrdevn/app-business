import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GeralService} from '../api/geral.service';
import {AlertController} from '@ionic/angular';
import { Produto } from '../models/produto.module';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  produto: Produto;
  constructor(
    private geralService: GeralService, 
    private _router: Router,
    private alertCtrl:AlertController) { 
    this.produto = new Produto();
  
  }
  
  ngOnInit() {
  }

  salvarProduto() {
    console.log("Chegou");
    this.geralService.salvarProduto(this.produto,'2');
    this.presentAlert();
    this._router.navigateByUrl('/produtos');
    
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Cadastro',
      //subHeader: 'Subtitle',
      message: 'Produto cadastrado!',
      buttons: ['OK']
    });
    await alert.present();
  }

}
