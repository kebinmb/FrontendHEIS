import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient,private tokenService:TokenService,private snackBar:MatSnackBar) { }

  getDailyReports(date: string, name: string): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Replace with your actual token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Adjust the token format if necessary
        });
        return this.http.get(`${this.apiServerUrl}/reports/daily/${date}`, {
          params: { name: name.toString() },
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response) || []; // Parse the response and return or an empty array if null/undefined
        } catch (e) {
          console.error('Failed to parse response', e);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Failed to fetch daily reports', error);
        return of([]); // Return an empty array on error
      })
    );
  }
  

  getMonthlyReports(month: string, year: string, name: string): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Replace with your actual token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Adjust the token format if necessary
        });
        return this.http.get(`${this.apiServerUrl}/reports/monthly/${month}/${year}`, {
          params: { name: name.toString() },
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response) || []; // Parse and return or empty array if null/undefined
        } catch (e) {
          console.error('Failed to parse response', e);
          return [];
        }
      }),
      catchError((error) => {
        if (error.status === 500) {
          this.snackBar.open('Internal server error occurred. Please try again later.', 'Close', {
            duration: 5000,
          });
        }
        console.error('Failed to fetch monthly reports', error);
        return of([]); // Return an empty array on error
      })
    );
  }
  

  getUserList(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Replace with your actual token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Adjust the token format if necessary
        });
        return this.http.get(`${this.apiServerUrl}/reports/receivers`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response) || []; // Parse the response and return an empty array if null/undefined
        } catch (e) {
          console.error('Failed to parse response', e);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Failed to fetch user list', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  getExternalReports(externalDate: string, externalYear: string, name: string): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Replace with your actual token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Adjust the token format if necessary
        });
        return this.http.get(`${this.apiServerUrl}/reports/external/${externalDate}/${externalYear}`, {
          params: { name: name.toString() },
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response) || []; // Parse the response or return an empty array if null/undefined
        } catch (e) {
          console.error('Failed to parse response', e);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Failed to fetch external reports', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  getDepartmentDetails(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Replace with your actual token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Adjust the token format if necessary
        });
        return this.http.get(`${this.apiServerUrl}/department/departdetails`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response) || []; // Parse and return or an empty array if null/undefined
        } catch (e) {
          console.error('Failed to parse response', e);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Failed to fetch department details', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  
}
