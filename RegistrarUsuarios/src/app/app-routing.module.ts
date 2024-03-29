import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomePage } from './home/home.page';
import { UsuarioComponent } from './usuario/usuario.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  {path: 'usuario', component: UsuarioComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
