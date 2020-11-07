import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../api/services/login.service';
import { LoginRetorno } from '../models/login.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  senha = '';
  isSubmited = false;
  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService : LoginService) {}


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
      console.log("formulário inválido (falta implementar notification)")
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
        console.log(error ); // @TODO implementar notification
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
}
