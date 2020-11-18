import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/api/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.module';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent {

  usuario: Usuario;
  loginForm: FormGroup;
  constructor(
    private _router: Router,
    private alertCtrl:AlertController,
    private usuarioService:UsuarioService) { 
    this.usuario = new Usuario();
  
  }


  salvarUsuario() {
    this.usuarioService.saveUser(this.usuario);
    console.log("Chegou");
    
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
