import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../api/services/login.service';
import { AppComponent } from '../app.component';
import { Usuario } from '../models/usuario.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  logged: boolean = false;
  usuarioLogado : Usuario;
  
  constructor(private router:Router,
              private loginService : LoginService) {}

  ngOnInit() {
    this.loginService.getUserInformation$.subscribe(val => {
      this.usuarioLogado = val;
    });
  }
  detalhesVendas() {
    this.router.navigateByUrl("/detalhes-vendas");
  }

}
