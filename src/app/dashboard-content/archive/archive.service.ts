import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient, private tokenService:TokenService) { }

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

  public getAdminDetails(){
    return this.http.get(`${this.apiBaseUrl}/user/details`,{responseType:'text',withCredentials:true}).pipe(
      map((response:any)=>{
        try{
          return JSON.parse(response);
        }catch(e){
          console.error('Failed to parse response',e)
          return [];
        }
      })
    );
   }
}
