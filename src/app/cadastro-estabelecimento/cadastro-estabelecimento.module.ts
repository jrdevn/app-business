import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroEstabelecimentoPageRoutingModule } from './cadastro-estabelecimento.routing.module';
import { CadastroEstabelecimentoComponent } from './cadastro-estabelecimento.component';

@NgModule({
  declarations: [CadastroEstabelecimentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroEstabelecimentoPageRoutingModule
  ]
})
export class CadastroEstabelecimentoModule { }
