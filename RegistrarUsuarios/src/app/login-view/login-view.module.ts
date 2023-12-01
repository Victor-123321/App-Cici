import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginViewComponent } from './login-view.component';
import { LoginViewRouting } from './login-view-routing.module';
import { LoginComponentModule } from '../login/login.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginComponentModule,
    LoginViewComponent,
    LoginViewRouting         
  ],
  declarations: [LoginViewComponent]
})
export class HomePageModule {
}