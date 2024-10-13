import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiverModalServiceService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private tokenService:TokenService,private http:HttpClient) { }

  getNotifications(): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.access_token;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        });
        // Sending the request to the backend
        const options = { headers: headers, withCredentials: true };
        const url = `${this.apiBaseUrl}/notifications/all`;
  
        // Return the HTTP request observable
        return this.http.get(url, options); // Assuming httpClient is defined
      })
    );
  }
}
