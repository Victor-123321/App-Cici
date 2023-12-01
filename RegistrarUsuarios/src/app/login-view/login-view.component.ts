import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent  implements OnInit {

  constructor() { }
  showLogin: boolean = true;

  // Method to toggle the visibility of app-login
  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
  ngOnInit() {}

}
