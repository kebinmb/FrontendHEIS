import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of, switchMap, throwError } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

 
  constructor(private http:HttpClient, private tokenService:TokenService
  ) { }
  private apiServerUrl = environment.apiBaseUrl;
  getUserList(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token"); // Get the token from token service
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Add token to the Authorization header
        });
        return this.http.get(`${this.apiServerUrl}/user/users`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: any) => {
        try {
          return JSON.parse(response); // Parse the JSON response
        } catch (e) {
          console.error('Failed to parse response', e);
          return []; // Return an empty array if parsing fails
        }
      }),
      catchError((error) => {
        console.error('Failed to fetch user list', error);
        return throwError(() => new Error('Failed to fetch user list'));
      })
    );
  }

  getLogs(date: string, campus: number): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token"); // Get the token from the token service
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Add token to the Authorization header
        });
  
        const params = new HttpParams()
          .set('date', date)
          .set('campus', campus.toString());
  
        return this.http.get(`${this.apiServerUrl}/logs/searchlogs`, {
          headers: headers,
          params: params,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: any) => {
        try {
          return JSON.parse(response); // Parse the JSON response
        } catch (e) {
          console.error('Failed to parse response', e);
          return []; // Return an empty array if parsing fails
        }
      }),
      catchError((error) => {
        console.error('Failed to fetch logs', error);
        return throwError(() => new Error('Failed to fetch logs'));
      })
    );
  }

  getDocumentLogs(date: string, campus: string): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token"); // Get the token from the token service
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Add token to the Authorization header
        });
  
        const params = new HttpParams()
          .set('date', date)
          .set('campus', campus.toString());
  
        const url = campus === "4"
          ? `${this.apiServerUrl}/logs/documentLogsTalisayAccess`
          : `${this.apiServerUrl}/logs/documentLogs`;
  
        return this.http.get(url, {
          headers: headers,
          params: params,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response); // Parse the JSON response
        } catch (e) {
          console.error('Failed to parse response', e);
          return []; // Return an empty array if parsing fails
        }
      }),
      catchError((error) => {
        console.error('Error fetching document logs', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }


  getUserMaintenanceLogs(date: string, campus: number): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token"); // Get the token from the token service
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Add token to the Authorization header
        });
  
        const params = new HttpParams()
          .set('date', date)
          .set('campus', campus.toString());
  
        return this.http.get(`${this.apiServerUrl}/logs/usermainteLogs`, {
          headers: headers,
          params: params,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response); // Parse the JSON response
        } catch (e) {
          console.error('Failed to parse response', e);
          return []; // Return an empty array if parsing fails
        }
      }),
      catchError((error) => {
        console.error('Error fetching user maintenance logs', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  getActivityLogs(date: string, campus: number): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = sessionStorage.getItem("access_token"); // Get the token from the token service
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Add token to the Authorization header
        });
  
        const params = new HttpParams()
          .set('date', date)
          .set('campus', campus.toString());
  
        return this.http.get(`${this.apiServerUrl}/logs/activitylogs`, {
          headers: headers,
          params: params,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response); // Parse the JSON response
        } catch (e) {
          console.error('Failed to parse response', e);
          return []; // Return an empty array if parsing fails
        }
      }),
      catchError((error) => {
        console.error('Error fetching activity logs', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }
}
