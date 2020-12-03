import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';
import { BrMaskDirective, BrMaskModel } from 'br-mask';
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

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
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
    private loadCtrl:LoadingController,
    private brMaskerDirective : BrMaskDirective) { 
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
    if (this.usuario.senha.length < 6) {
      this.presentAlert("Senha deve ter minimo 6 caracteres")
    } 
    if (this.usuario.telefone != null) {
      if (this.usuario.telefone.toString().length < 15) {
        this.presentAlert("Telefone celular inválido!!")
        return false;
      }
    }
    if (!this.userForm.invalid) {
      loading.present();
        this.usuarioService.saveUser(this.usuario).subscribe(data => {
          loading.dismiss();
          this.presentAlert("Usuario cadastrado!")
          this.userForm.reset();
          this.isSubmited = false;
          this._router.navigateByUrl('/admin');
        }, (error: HttpErrorResponse) => {
          loading.dismiss();
          this.alertUserError(error); 
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
     });
  }

  criarFormulario() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      estabelecimento: ['',[Validators.required, Validators.nullValidator]],
      perfil : ['',[Validators.required, Validators.nullValidator]],
      telefone: new FormControl(this.createPhone),
      nome: ['',[Validators.required, Validators.nullValidator]]
    });
  }

  backToDashboard() {
    this.isSubmited = false;
    this.userForm.reset();
    this._router.navigateByUrl('/admin');
  }

  private createPhone(): string {
    const config: BrMaskModel = new BrMaskModel();
    config.phone = true;
    return this.brMaskerDirective.writeCreateValue('99999999999', config);
  }
}
