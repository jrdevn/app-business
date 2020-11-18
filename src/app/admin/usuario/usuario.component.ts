import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  
  loginForm: FormGroup;
  constructor(
    private _router: Router,
    private alertCtrl:AlertController,
    private usuarioService:UsuarioService,
    private estabelecimentoService:EstabelecimentoService) { 
    this.usuario = new Usuario();
    this.estabelecimento = new Estabelecimento();
  
  }

  ngOnInit() {
    this.carregaEstabelecimentos();
  }


  salvarUsuario() {
    if (this.isValid(this.usuario)) {
      this.usuarioService.saveUser(this.usuario).subscribe(data => {
        this.presentAlert("Usuario cadastrado!")
        this._router.navigateByUrl('/admin');
      }, (error: HttpErrorResponse) => {
        this.presentAlert("Favor validar os campos do formulário"); //@TODO: FAZER UM VALIDADOR DOS DADOS DO FORMULARIO
       });
  
    }
  }

  async presentAlert(mensagem: string) {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Cadastro',
      //subHeader: 'Subtitle',
      message: 'Usuário cadastrado!',
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

   isValid(usuario:Usuario): boolean  {
    if (usuario.nome == "") {
       return false;
    }
    if   (usuario.email == "") {
      return false;
    }
    if  (usuario.senha.length <= 9)  {
      return false;
    }
    if  (usuario.telefone = null )  {
      return false;
    }
    if   (usuario.perfil_id == null)  {
      return false;
    }
    if  (usuario.estabelecimento_id == null) {
      return false;
    }
         
  }

  }

