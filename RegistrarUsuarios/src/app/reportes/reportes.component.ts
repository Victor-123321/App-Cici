import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-reportes',
  template: `
  <div class="information">
    <div *ngFor="let report of reports">
      <h2>{{ report.title }}</h2>
      <p>{{ report.description }}</p>
      <!-- TODO: Hacer que cargue la dirección desde las coordenadas con Nominatim -->
      <ion-card class="cardPost">
      <ion-card-header>
        <ion-card-subtitle>
          <ion-chip>
          <ion-avatar>
            <img alt="Silhouette of a person's head" src="{{report.usuario.avatar}}" />
          </ion-avatar>
          <ion-label>{{report.usuario.nombre}}</ion-label>
          <ion-icon name="close-circle"></ion-icon>
        </ion-chip>
      </ion-card-subtitle>
      <ion-card-title>{{report.nombre}}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <div class="contentPost">
          <p>{{report.detalles}}</p>
          <div class="ImagenPost">
            <img src="data:image/png;base64, {{report.source}}" alt="">
            <div class="floatUbicacion">
              <ion-icon name="pin-outline" size="large"></ion-icon>
            </div>
          </div>
          
        </div>
        <div class="footerPost">
          <div class="btnFooterPost">
            <ion-item>
              <ion-button fill="clear"><ion-icon size="large" name="thumbs-up-outline"></ion-icon></ion-button>
              <ion-badge slot="end">22</ion-badge>
            </ion-item>
            
          </div>
          <div class="btnFooterPost">
            <ion-item>
              <ion-button fill="clear"><ion-icon size="large" name="thumbs-up-outline"></ion-icon></ion-button>
              <ion-badge slot="end">22</ion-badge>
            </ion-item>
          </div>
          <div class="btnFooterPost">
            <ion-item>
              <ion-button fill="clear"><ion-icon size="large" name="thumbs-up-outline"></ion-icon></ion-button>
              <ion-badge slot="end">22</ion-badge>
            </ion-item>
          </div>
        </div>
      </ion-card-content>
    </ion-card>

    </div>
  </div>
  `,
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent  implements OnInit {

  reports: any[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    const apiUrl = "http://localhost:5500/api/cargarReportes";
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
         this.reports = data;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

}
