import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiBaseUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) {}

  public getToken(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/token/access`, { withCredentials: true });
  }

}
