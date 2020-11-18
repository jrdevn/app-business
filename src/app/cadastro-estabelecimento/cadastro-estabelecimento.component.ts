import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EstabelecimentoService } from '../api/services/estabelecimento.service';
import { Estabelecimento } from '../models/estabelecimento.module';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cadastro-estabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss'],
})
export class CadastroEstabelecimentoComponent implements OnInit {

  estabelecimento: Estabelecimento;
  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private alertCtrl: AlertController,
    private _router: Router,
    ) {
           this.estabelecimento = new Estabelecimento();
    }

  ngOnInit() {}

  saveEstabelecimento() {
    this.estabelecimentoService.saveEstabelecimento(this.estabelecimento).subscribe(data => {
      this.presentAlert()
      this._router.navigateByUrl('/admin');
    }, (error: HttpErrorResponse) => {
      this.invalidEstabelecimento();  
     });;
    
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Cadastro',
      //subHeader: 'Subtitle',
      message: 'Estabelecimento cadastrado!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async invalidEstabelecimento() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Cadastro',
      //subHeader: 'Subtitle',
      message: 'Estabelecimento não cadastrado favor tente novamente mais tarde!',
      buttons: ['OK']
    });
    await alert.present();
  }


}
