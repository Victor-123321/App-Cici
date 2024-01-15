import { Component } from '@angular/core';
import { ModalController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  showLogin: boolean = false;
  data: { field1: string, field2: string } = { field1: '', field2: '' };
  message = 'Abrir el modal automàticamente cuando se presiona el botón';

  constructor(
    private modalController: ModalController,
    ) {}
  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  async cancel() {
    const modal = await this.modalController.getTop();
    modal?.dismiss(null, 'cancel');
  }

  async confirm() {
    const modal = await this.modalController.getTop();
    modal?.dismiss("test", 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  submitData() {
    // You can add validation and data processing logic here
    console.log('Data to be submitted:', this.data);
  }

  

}