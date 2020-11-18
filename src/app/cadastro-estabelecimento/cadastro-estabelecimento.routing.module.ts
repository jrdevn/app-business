import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroEstabelecimentoComponent } from './cadastro-estabelecimento.component';

const routes: Routes = [
    {
      path: '',
      component: CadastroEstabelecimentoComponent
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CadastroEstabelecimentoPageRoutingModule {}
  