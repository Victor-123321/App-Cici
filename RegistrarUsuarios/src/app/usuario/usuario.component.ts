import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent  implements OnInit {

  constructor(private http: HttpClient) { }

  datosUsuario: any[];

  ngOnInit() {

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
