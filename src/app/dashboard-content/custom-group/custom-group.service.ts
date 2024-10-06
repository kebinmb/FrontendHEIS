import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomGroupService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient,private tokenService:TokenService) { }
  
  createCustomGroup(formData: FormData): Observable<string> {
    return this.tokenService.getToken().pipe(
        switchMap((response: any) => {
            const token = response.accessToken; // Retrieve the access token
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}` // Set the Authorization header
            });

            return this.http.post<string>(`${this.apiServerUrl}/customgroup/newGroup`, formData, {
                headers: headers,
                responseType: 'text' as 'json', // Treat the response as text
                withCredentials: true
            });
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

  getCustomGroupDetails(groupName: string): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        const params = new HttpParams().set('groupName', groupName);
  
        return this.http.get<any[]>(`${this.apiServerUrl}/customgroup/cgdetails`, {
          headers: headers,
          withCredentials: true,
          params: params
        }).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  getAllUserDetails(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get<any[]>(`${this.apiServerUrl}/user/users`, {
          headers: headers,
          withCredentials: true
        });
      }),
      catchError(this.handleError) // Handle errors
    );
  }
  
  getAllCustomGroup():Observable<any[]>{
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get<any[]>(`${this.apiServerUrl}/customgroup/allGroup`, {
          headers: headers,
          withCredentials: true
        });
      }),
      catchError(this.handleError) // Handle errors
    );
  }
}
