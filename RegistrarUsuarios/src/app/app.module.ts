import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { TabsComponentModule } from './tabs/tabs.component.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { HomePageModule } from './home/home.module';
import { LoginComponentModule } from './login/login.module';
import { UsuarioComponentModule } from './usuario/usuario.component.module';
import { ReportesComponentModule } from './reportes/reportes.component.module';
import { MainComponentModule } from './main/main.component.module';
@NgModule({
  
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, OAuthModule.forRoot(), ReportesComponentModule, HttpClientModule, HomePageModule, LoginComponentModule, UsuarioComponentModule, TabsComponentModule, MainComponentModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
