import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationInformationServiceService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private tokenService:TokenService, private http:HttpClient, private snackBar:MatSnackBar) { }

  

  getMonthlyReports(month:string,year:string):Observable<any[]>{
    return this.tokenService.getToken().pipe(
      switchMap((response:any)=>{
        const token=response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get(`${this.apiBaseUrl}/reports/monthly/${month}/${year}`,{
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


}
