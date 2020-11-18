import { Component, OnChanges, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './api/services/login.service';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnChanges, OnInit{

  logged: boolean = false;
  usuarioLogado : Usuario;

  constructor(
    private loginService: LoginService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    this.loginService.getIsLogged$
    .subscribe((data) => {
      if (data) {
        console.log("logado")
        this.initializeApp();
        this.getProfile();
        this.logged = data;
      } else {
        console.log("deslogado")
        this.logged = data;
        this.router.navigate(['login']);
      }
    }); 
  }

  ngOnChanges() {
   
  }

  getProfile() {
    this.loginService.getUserInformation$.
      subscribe((data) => {
        let profile : Usuario = {
          nome: data.nome,
          email: data.email,
          perfil_id: data.tipoUsuario,
          id: data.id,
          estabelecimento_id: data.estabelecimento,
        }
        this.usuarioLogado = profile;
        console.log(this.usuarioLogado);
        console.log(profile);
      })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    console.log("bateu aqui")
    this.alertConfirmLogout();
  }

  async alertConfirmLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Sair',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            {}
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.loginService.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
