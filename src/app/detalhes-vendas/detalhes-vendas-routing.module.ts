import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesVendasPage } from './detalhes-vendas.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesVendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesVendasPageRoutingModule {}
