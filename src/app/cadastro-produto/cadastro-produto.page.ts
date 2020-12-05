import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavParams,AlertController,LoadingController} from '@ionic/angular';
import { Produto } from '../models/produto.module';
import { ProdutoService } from '../api/services/produtos.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { EstabelecimentoService } from '../api/services/estabelecimento.service';
import { Estabelecimento } from '../models/estabelecimento.module';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  produto: Produto;
  prodForm: FormGroup;
  estabelecimento = {} as Estabelecimento;
  estabelecimentos: Estabelecimento[];
  isSubmited : boolean = false;
  isAlteracao: boolean = false;
  
   constructor(
    private produtoService: ProdutoService, 
    private _router: Router,
    private formBuilder: FormBuilder,
    private alertCtrl:AlertController,
    private estabelecimentoService:EstabelecimentoService,
    private loadCtrl: LoadingController
    ) { 

    if (this._router.getCurrentNavigation().extras.state) {
      this.produto = this._router.getCurrentNavigation().extras.state.productdetails;
      this.isAlteracao = true;
    }
    else {
      this.produto = new Produto();
    }
    
    this.estabelecimento = new Estabelecimento();
  }
  
  ngOnInit() {
    this.criarForm();
    this.carregaEstabelecimentos();
    this.isSubmited = false;
  }

  async removerProduto() {
    console.log("xxxx")
    let loading =  await this.loadCtrl.create({
      message: "Excluindo produto"
    });
    loading.present();
    this.produtoService.cancelarProduto(this.produto.id).subscribe(data => {
      this.isSubmited = false;
      this.presentAlert("Produto removido");
      this._router.navigateByUrl('/produtos')
      loading.dismiss();
    }, (error : HttpErrorResponse) => {
      this.alertUserError(error);
      loading.dismiss();
    });
  }

  async salvarProduto() {
    let loading =  await this.loadCtrl.create({
      message: "Salvando produto"
    });
    if (this.prodForm.valid) {
      for(var i=0; i < this.produto.estabelecimento.length; i++) {
        delete this.produto.estabelecimento[i].status;
      }
      loading.present();
      this.isSubmited = true;
      if (this.isAlteracao) {
          let id = this.produto.id;
          this.produtoService.updateProduto(this.produto,id).subscribe(data => {
          this.isSubmited = false;    
          this.presentAlert("Produto alterado");
          this._router.navigateByUrl('/produtos');
         loading.dismiss();
        }, (error: HttpErrorResponse) => {
            this.alertUserError(error);
            loading.dismiss();
         });

      }
      else {
        this.produtoService.saveProduto(this.produto).subscribe(data => {
          this.prodForm.reset();
          this.isSubmited = false;
          this.presentAlert("Produto cadastrado");
          this._router.navigateByUrl('/produtos')
          loading.dismiss();
        }, (error: HttpErrorResponse) => {
            this.alertUserError(error);
            loading.dismiss();
         });
      }
    } 
    else {
      this.presentAlert("Dados inválidos!")
      loading.dismiss();
    }
  }
    
  

  async alertUserError(error: HttpErrorResponse) {
    
    const alert = await this.alertCtrl.create({
      header: "Ops!! Ocorreu um erro",
//      subHeader: String(error.status),
      message: error.error.message,
      cssClass: 'alertDanger',
      buttons: ['OK']
    });
    await alert.present();
  }

  get formControls() {
    return this.prodForm.controls;
  }

  criarForm() {
    this.prodForm = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.nullValidator]],
      valor : ['',[Validators.required, Validators.nullValidator]],
      estabelecimento : ['',[Validators.required, Validators.nullValidator]]
    });
  }

  async presentAlert(messagep: string) {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Cadastro',
      //subHeader: 'Subtitle',
      message: messagep,
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

  backToDashboard() {
    this.isSubmited = false;
    this.prodForm.reset();
    this._router.navigateByUrl('/admin');

  }

}
