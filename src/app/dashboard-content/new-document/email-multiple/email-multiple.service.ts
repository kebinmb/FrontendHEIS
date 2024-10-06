import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, switchMap } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailMultipleService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient, private tokenService:TokenService) { }

  getNextDocumentNumber(): Observable<number> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get(`${this.apiServerUrl}/emails/docnum`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => parseInt(response, 10)), // Convert the response to a number
      catchError(this.handleError) // Handle errors
    );
  }
  
  getAllUserDetails(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get(`${this.apiServerUrl}/user/users`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse), // Use the existing parseResponse function
      catchError(this.handleError) // Handle errors
    );
  }
  
  sendEmail(formData: FormData): Observable<string> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.post<string>(`${this.apiServerUrl}/emails/sendMultiple`, formData, {
          headers: headers,
          responseType: 'text' as 'json',
          withCredentials: true
        });
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  getAllCustomGroup(): Observable<string> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get(`${this.apiServerUrl}/customgroup/allGroup`, {
          headers: headers,
          withCredentials: true,
          
        }) as Observable<string>;
      }),
      catchError(this.handleError) // Handle errors
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
  
  private parseResponse(response: any): any[] {
    try {
      return JSON.parse(response);
    } catch (e) {
      console.error('Failed to parse response', e);
      return [];
    }
  }
  
}
