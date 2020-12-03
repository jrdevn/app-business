import { Component, OnChanges, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './api/services/login.service';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario.module';
import { Estabelecimento } from './models/estabelecimento.module';
import { EstabelecimentoService } from './api/services/estabelecimento.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnChanges, OnInit{

  userAdm : boolean;
  logged: boolean = false;
  usuarioLogado : Usuario;
  estabelecimento = {} as Estabelecimento;
  estabelecimentos: Estabelecimento[];
  myInputs = [];


  constructor(
    private loginService: LoginService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private estabelecimentoService: EstabelecimentoService,
    private _router: Router
  ) {
    this.estabelecimento = new Estabelecimento();         

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

        if (this.usuarioLogado.perfil_id != 1) {
           this.userAdm = false;
        }
        else {
          this.userAdm = true;
        }
      })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
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

  validaEstabelecimento() {
    if (!this.userAdm) {
      this._router.navigate(['/lancamento'], { 
        state: { estabelecimentoId: this.usuarioLogado.estabelecimento_id }
      });
    }
    else {
      this.carregaEstabelecimentos();
    }
  }

  carregaEstabelecimentos() {
    this.estabelecimentoService.findAll().subscribe(data => {
      this.estabelecimentos = data;
      this.myInputs = this.createInputs(this.estabelecimentos);
      this.showCheckbox();
    }, (error: HttpErrorResponse) => {
     });
  }

  async showCheckbox() {
    let alert = await  this.alertCtrl.create({
        header: "Estabelecimento",
        inputs: this.myInputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Ok',
            
            handler: (alertData) => {
                this._router.navigate(['/lancamento'], { 
                state: { estabelecimentoId: alertData  }
              });
          
            }
          }
        ] 
    });

    await alert.present();
  }

  createInputs(estabelecimentoHelp: Estabelecimento[]) {
    const theNewInputs = [];
    for (let i = 0; i < estabelecimentoHelp.length; i++) {
      theNewInputs.push(
        {
          type: 'radio',
          name: this.estabelecimentos[i].nome,
          label: this.estabelecimentos[i].nome,
          placeholder: this.estabelecimentos[i].nome,
          value: this.estabelecimentos[i].id,
          checked: false
        }
      );
    }
    return theNewInputs;
    
  }


}
