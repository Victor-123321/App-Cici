import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'body-parser';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  private readonly UrlNominatim = "https://nominatim.openstreetmap.org/reverse"

  constructor(private http: HttpClient) { }

  getAddress(latitude: number, longitude: number): Observable<any> {
    const apiUrl = `${this.UrlNominatim}?format=json&lat=${latitude}&lon=${longitude}`;
    return this.http.get(apiUrl, {responseType: 'json'});
  }
}
