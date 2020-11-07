import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../api/services/login.service';
import { LoginRetorno } from '../models/login.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSubmited = false;
  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService : LoginService,
              private alertController : AlertController) {}


  ngOnInit() {
    this.criarFormulario();
    this.getIsLogged();
  }

  get formControls() {
    return this.loginForm.controls;
  }

  getIsLogged() {
    this.loginService.getIsLogged$.subscribe((data) => {
      if (data) {
        this.entrar();
      }
    })
  }

  efetuarLogin() {
    if (this.loginForm.invalid) {
     return this.alertFormularioInvalido();
    }

    this.loginService
      .login(this.loginForm.value)
      .subscribe((data: LoginRetorno) => {
        const jwtToken = `Bearer ${data.token}`;
        sessionStorage.setItem('token', jwtToken);

        const userInformation: LoginRetorno = data;
        sessionStorage.setItem('user', JSON.stringify(userInformation));

        this.loginService.setUserInformation$(userInformation);

        this.loginService.setIsLogged$(true);

      }, (error: HttpErrorResponse) => {
        this.alertLoginError(error); // @TODO implementar notification
      });
  }

  entrar() {
    this.router.navigateByUrl("/home");
  }

  criarFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async alertLoginError(error: HttpErrorResponse) {
    const alert = await this.alertController.create({
      header: error.error.error,
      subHeader: String(error.status),
      message: error.error.message,
      cssClass: 'alertDanger',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertFormularioInvalido() {
    const alert = await this.alertController.create({
      header: 'Ops!',
      message: 'Formulário inválido, verifique e-mail e senha.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
