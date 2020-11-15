import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';
import { UsuarioPageRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    UsuarioPageRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class UsuarioModule { }
