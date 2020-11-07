import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
export class AppComponent {

  logged: boolean = false;
  usuarioLogado : Usuario;

  constructor(
    private loginService: LoginService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

  }

  ngOnInit() {
    this.loginService.getIsLogged$
      .subscribe((data) => {
        if (data) {
          this.initializeApp();
          this.getProfile();
          this.logged = data;
        } else {
          this.logged = data;
          this.router.navigate(['']);
        }
      })      
  }

  getProfile() {
    this.loginService.getUserInformation$.
      subscribe((data) => {
        let profile : Usuario = {
          nome: data.nome,
          email: data.email,
          tipoUsuario: data.tipoUsuario,
          id: data.id,
          estabelecimento: data.estabelecimento,
        }
        this.usuarioLogado = profile;
      })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
