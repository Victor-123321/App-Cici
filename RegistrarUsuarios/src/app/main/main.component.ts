import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { json } from 'body-parser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {

  constructor(
    private oauthService: OAuthService,
    private authGoogleService: DataService,
    private router: Router,
    private http: HttpClient
    
  ) { }


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
      console.log(combinedData);
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

}