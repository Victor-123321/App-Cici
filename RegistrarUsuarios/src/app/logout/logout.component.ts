import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  implements OnInit {

  constructor(private authGoogleService: DataService) { }

  ngOnInit() {
    this.authGoogleService.logout();
    window.location.href="/login";
  }

}
