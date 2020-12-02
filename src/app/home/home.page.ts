import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../api/services/login.service';
import { AppComponent } from '../app.component';
import { Usuario } from '../models/usuario.module';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  logged: boolean = false;
  usuarioLogado : Usuario;
  
  constructor(private router:Router,
              private loginService : LoginService,
              private loadCtrl: LoadingController) {}

  ngOnInit() {
    this.loginService.getUserInformation$.subscribe(val => {
      this.usuarioLogado = val; /* implementar loading */
    });

    let object = new Date();
    console.log(object);
  }


  detalhesVendas() {
    this.router.navigateByUrl("/detalhes-vendas");
  }

}
