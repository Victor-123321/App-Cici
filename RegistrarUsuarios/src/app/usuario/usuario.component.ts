import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent  implements OnInit {

  user: any | undefined;

  constructor(private http: HttpClient) { 
    //datosUsuario: any[];
  }

  

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const apiUrl = "http://localhost:5500/api/getDatos";
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
         this.user = data[0];
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

}
