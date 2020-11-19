import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';
import { EstabelecimentoService } from 'src/app/api/services/estabelecimento.service';
import { UsuarioService } from 'src/app/api/services/usuarios.service';
import { Estabelecimento } from 'src/app/models/estabelecimento.module';
import { Usuario } from 'src/app/models/usuario.module';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit{

  usuario: Usuario;
  estabelecimento = {} as Estabelecimento;
  estabelecimentos: Estabelecimento[];
  isSubmited : boolean = false;
  
  userForm: FormGroup;
  constructor(
    private _router: Router,
    private alertCtrl:AlertController,
    private usuarioService:UsuarioService,
    private estabelecimentoService:EstabelecimentoService,
    private formBuilder: FormBuilder,
    private loadCtrl:LoadingController) { 
    this.usuario = new Usuario();
    this.estabelecimento = new Estabelecimento();
  
  }

  ngOnInit() {
    this.criarFormulario();
    this.carregaEstabelecimentos();
    this.isSubmited = false;
  }

  get formControls() {
    return this.userForm.controls;
  }

  async salvarUsuario() {
    this.isSubmited = true;
    let loading =  await this.loadCtrl.create({
      message: "Salvando usuario"
    });
    if (!this.userForm.invalid) {
      loading.present();
      console.log(this.usuario);
        this.usuarioService.saveUser(this.usuario).subscribe(data => {
          loading.dismiss();
          this.presentAlert("Usuario cadastrado!")
          this.userForm.reset();
          this.isSubmited = false;
          this._router.navigateByUrl('/admin');
        }, (error: HttpErrorResponse) => {
          loading.dismiss();
          this.alertUserError(error); //@TODO: FAZER UM VALIDADOR DOS DADOS DO FORMULARIO
         });
    }
  }

  async presentAlert(mensagem: string) {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Cadastro',
      //subHeader: 'Subtitle',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertUserError(error: HttpErrorResponse) {
    var message;
    const alert = await this.alertCtrl.create({
      header: "Formulário inválido",
//      subHeader: String(error.status),
      message: error.error.message,
      cssClass: 'alertDanger',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  carregaEstabelecimentos() {
    this.estabelecimentoService.findAll().subscribe(data => {
      this.estabelecimentos = data;
    }, (error: HttpErrorResponse) => {
         console.log(error);
     });
  }

  criarFormulario() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      estabelecimento: ['',[Validators.required, Validators.nullValidator]],
      perfil : ['',[Validators.required, Validators.nullValidator]],
      telefone: ['',[Validators.required, Validators.nullValidator]],
      nome: ['',[Validators.required, Validators.nullValidator]]
    });
    console.log(this.userForm);
  }

  backToDashboard() {
    this.isSubmited = false;
    this.userForm.reset();
    this._router.navigateByUrl('/admin');
  }
}
