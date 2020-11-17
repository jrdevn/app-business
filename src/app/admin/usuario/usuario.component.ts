import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.module';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private _router: Router,
    private alertCtrl:AlertController) {  
  }

  ngOnInit() {}

  salvarUsuario() {
    this.presentAlert();
    this._router.navigateByUrl('/admin-usuario');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Cadastro',
      //subHeader: 'Subtitle',
      message: 'Usuário cadastrado!',
      buttons: ['OK']
    });
    await alert.present();
  }

}
