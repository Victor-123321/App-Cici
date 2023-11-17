import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})



export class MainComponent implements OnInit {
imagenbase64:any;

  constructor(
    private oauthService: OAuthService,
    private authGoogleService: DataService,
    private router: Router,
    private http: HttpClient

  ) { }
  ngOnInit() {
    // This function will be called when the page loads
    this.showData();
  }

  @Injectable({    
    providedIn: 'root' // This makes the service available as a singleton across your app
  })
 
  
  async getUserInfo(accessToken: string): Promise<string> {
    const peopleApiUrl = 'https://people.googleapis.com/v1/people/me?personFields=genders,birthdays';
  
    try {
      var profile: any = await this.http.get(peopleApiUrl, { headers: { Authorization: `Bearer ${accessToken}` } }).toPromise();
  
     // const cumpleañosGenero = Object.assign({}, profile.birthdays[0].date, profile.genders[0].value)
     const cumpleaños = profile.birthdays[0].date;
      const genero = profile.genders[0].value;

     const cumpleañosGenero = { cumpleaños, genero }

      console.log(cumpleañosGenero);

      return JSON.stringify(cumpleañosGenero);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return '';
    }
  }

  async showData() {
    try {
      const tokenAcceso = this.oauthService.getAccessToken();
      const userInfo = await this.getUserInfo(tokenAcceso); // Use await here
  
      const data = JSON.stringify(this.authGoogleService.getProfile());


      const infoUsuario = JSON.parse(userInfo);
      const datosGenerales = JSON.parse(data);

console.log(infoUsuario, datosGenerales);

      const combinedData = {datosGenerales, infoUsuario};
  
      const serverUrl = 'http://localhost:5500/api/enviarbdd';
  
      const accessToken = '88404835696-ki1u0jcei9jjsn7lkc80vt56vigglodq.apps.googleusercontent.com'; // Replace with your actual access token
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      });
     
      // Now, you can use userInfo with await
      const result = await lastValueFrom(this.http
        .post(serverUrl, combinedData, { headers }))
        
       
      console.log('Data sent successfully', result);
    } catch (error) {
      
      console.error('Error:', error);
    }
    
  }
  logOut() {
    this.authGoogleService.logout();
    this.router.navigate(['login']);
  }

async guardarFotoBdd(){
  
  const txtnombre = document.getElementById("txtNombre") as HTMLInputElement;
  const txtdetalles = document.getElementById("txtDetalles") as HTMLInputElement;
  
  const imagenTest = document.getElementById("imagenTest") as HTMLImageElement;

  const uploadUrl = 'http:localhost:5500/api/subirimagenserver'; // Replace with your server endpoint

  



  if(txtnombre?.value == null || txtdetalles?.value == null){
    alert('Introduce valores en los campos!');
  } else {

 
    const emailUsuario = this.authGoogleService.getProfile()['email'];

    const coordinates = await Geolocation.getCurrentPosition();
  

    const coordenadas = {
      latitud:  coordinates.coords.latitude,
      longitud: coordinates.coords.longitude,
      precision: coordinates.coords.accuracy
    }
    
    // Creamos un objeto de la imagen
const datosImagen = {
  usuario: emailUsuario,
  source: this.imagenbase64,
  nombre: txtnombre.value,
  detalles: txtdetalles.value,
  ubicacion: coordenadas
};

// Convertimos el objeto a JSON
const jsonImagen: string = JSON.stringify(datosImagen, null, 2); // el tercer parámetro es para indentar

const servidor = "http://localhost:5500/api/enviarimagenbdd";

//Creamos un POST enviando los datos por JSON
fetch(servidor, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonImagen
})
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log("Respuesta:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
  }
}

  async LoadPhoto(){

    const uploadUrl = "http://localhost:5500/api/subirimagenserver"
    const imagenTest = document.getElementById("imagenTest") as HTMLImageElement;

const image = await Camera.getPhoto({
  quality: 90,
  allowEditing: true,
  resultType: CameraResultType.Base64
});
  
      if(image.base64String){
        this.imagenbase64 = image.base64String;
      }
    
    
    
    
  }
}