import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private tokenService:TokenService) {}
  private apiServerUrl = environment.apiBaseUrl;

  sendEmail(formData: FormData): Observable<string> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.post<string>(`${this.apiServerUrl}/emails/send`, formData, {
          headers: headers,
          responseType: 'text' as 'json',
          withCredentials: true
        });
      }),
      catchError(this.handleError)
    );
  }
  
  nextDocumentNumber(): Observable<number> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/emails/docnum`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => parseInt(response, 10)),
      catchError(this.handleError)
    );
  }
  
  uploadFile(formData: FormData): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.post(`${this.apiServerUrl}`, formData, {
          headers: headers,
          responseType: 'text' as 'json',
          withCredentials: true
        });
      }),
      catchError(this.handleError)
    );
  }
  
  getAllUser(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/user/users`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: any) => {
        try {
          return JSON.parse(response);
        } catch (e) {
          console.error('Failed to parse response', e);
          return [];
        }
      }),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  
}
