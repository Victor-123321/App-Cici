import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReportesComponent } from './reportes.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ReportesComponent],
  exports: [ReportesComponent]
})
export class ReportesComponentModule {
}
