import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { LoginComponentModule } from '../login/login.module';
import { TabsComponentModule } from '../tabs/tabs.component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginComponentModule,
    TabsComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
