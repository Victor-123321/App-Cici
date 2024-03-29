import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';
import { TabsComponentModule } from '../tabs/tabs.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsComponentModule
  ],
  declarations: [UsuarioComponent]
})
export class UsuarioComponentModule {
}
