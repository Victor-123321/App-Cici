import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: { field1: string, field2: string } = { field1: '', field2: '' };

  submitData() {
    // You can add validation and data processing logic here
    console.log('Data to be submitted:', this.data);
  }

  constructor() {}

}
