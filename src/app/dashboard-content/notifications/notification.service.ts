import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { HttpService } from 'src/app/OAuthHttpServices/http.service';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenService:TokenService, private httpService:HttpService){}

  insertNotification(notification: any): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token"); // Replace with your actual token
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        });
  
        return this.http.post(`${this.apiBaseUrl}/notifications/view`, notification, {
          headers: headers,
          responseType: 'text', // Change responseType to 'text' to handle plain text
          withCredentials: true
        });
      }),
      map((response: string) => {
        return { message: response }; // Wrap response in an object
      }),
      catchError((error) => {
        console.error('Failed to insert notification', error);
        return throwError('An error occurred while inserting the notification'); // Handle errors
      })
    );
  }
  
  getLatestNotificationCount(): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token");
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        });
  
        // Make sure to define 'notification' as an empty object if it's not used
        const options = {
          headers: headers,
          responseType: 'text' as 'json', // Change responseType to 'text' to handle plain text
          withCredentials: true
        };
  
        // Corrected the http.get call to use options
        return this.http.get(`${this.apiBaseUrl}/notifications/notifcount`, options);
      })
    );
  }

  getDocumentDetails(documentId: number): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token");
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Add the token in the Authorization header
        });
        console.log(documentId);
        // Sending the request to the backend with documentId as a query parameter
        const options = { headers: headers, withCredentials: true };
        const url = `${this.apiBaseUrl}/archives/documentDetails?documentId=${documentId}`;

        return this.http.get(url, options).pipe(
          catchError(this.handleError) // Handle errors gracefully
        );
      })
    );
  }
   // Handle errors from the HTTP request
   private handleError(error: any): Observable<never> {
    console.error('Error fetching document details', error);
    return throwError('Failed to fetch document details; please try again later.');
  }

  generateUrls(filenames: string[]): Observable<Blob>[] {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Return an array of Observables (for each file request)
    return filenames.map(filename => {
      const url = `${this.apiBaseUrl}/archives/file/${filename}`;
      return this.http.get(url, { headers, responseType: 'blob' });
    });
  }

  parseFilenames(filenames: string | string[]): string[] {
    if (typeof filenames === 'string') {
      try {
        const parsed = JSON.parse(filenames);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        return filenames.split(',').map(item => item.trim());
      }
    } else if (Array.isArray(filenames)) {
      return filenames;
    }
    return [];
  }

  
  
  

}
