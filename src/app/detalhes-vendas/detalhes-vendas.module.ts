import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesVendasPageRoutingModule } from './detalhes-vendas-routing.module';

import { DetalhesVendasPage } from './detalhes-vendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesVendasPageRoutingModule
  ],
  declarations: [DetalhesVendasPage]
})
export class DetalhesVendasPageModule {}
