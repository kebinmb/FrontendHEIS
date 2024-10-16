import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap, map, catchError, of } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardInfoService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private tokenService:TokenService, private http:HttpClient, private snackBar:MatSnackBar) { }

  getAllNotifications():Observable<any[]>{
    return this.tokenService.getToken().pipe(
      switchMap((response:any)=>{
        const token=response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get(`${this.apiBaseUrl}/notifications/all`,{
          headers:headers,
          responseType:'text',
          withCredentials:true
        });
      }),
      map((response:string)=>{
        try{
          return JSON.parse(response) || [];
        }catch(e){
          console.error('Failed to parse response',e);
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

  getArchives(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Replace with your actual token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Adjust the token format if necessary
        });
        return this.http.get<any[]>(`${this.apiBaseUrl}/archives/documents`, {
          headers: headers,
          withCredentials: true
        });
      }),
      map((response: any[]) => {
        return response || []; // Return response or an empty array if null/undefined
      }),
      catchError((error) => {
        console.error('Failed to fetch archives', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  getUserList(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get<any[]>(`${this.apiBaseUrl}/reports/receivers`, {
          headers: headers,
          withCredentials: true
        }).pipe(
          map((response: any[]) => {
            return response || []; // No need to JSON.parse as it's already parsed
          }),
          catchError((error) => {
            console.error('Failed to fetch user list', error);
            return of([]); // Return an empty array on error
          })
        );
      }),
      catchError((error) => {
        console.error('Failed to fetch token', error);
        return of([]); // Return an empty array if token retrieval fails
      })
    );
  }
}
