import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map, catchError, switchMap } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailGroupService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient,private tokenService:TokenService) { }


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

  getFacultyUser(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get(`${this.apiServerUrl}/user/faculty`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse), // Use the existing parseResponse function
      catchError(this.handleError) // Handle any errors that occur during the HTTP request
    );
  }
  
  

  getFacultyEmail(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get(`${this.apiServerUrl}/user/femail`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse), // Use the existing parseResponse function
      catchError(this.handleError) // Handle any errors that occur during the HTTP request
    );
  }
  

  getStaffUser(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the access token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` // Set the Authorization header
        });
  
        return this.http.get(`${this.apiServerUrl}/user/staff`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  getStaffEmail(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/user/semail`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  getRegularFacultyEmail(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/user/regfaculty`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  getPartTimeFacultyEmail(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/user/ptfaculty`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  getRegularStaffEmail(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/user/regstaff`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  getJobOrderStaffEmail(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/user/jostaff`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  getAllUserDetails(): Observable<any[]> {
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
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  getNextDocumentNumber(): Observable<number> {
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
  
  getDepartmentDetails(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.get(`${this.apiServerUrl}/department/departdetails`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true
        });
      }),
      map(this.parseResponse),
      catchError(this.handleError)
    );
  }
  
  sendEmail(formData: FormData): Observable<string> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.post<string>(`${this.apiServerUrl}/emails/sendGroup`, formData, {
          headers: headers,
          responseType: 'text' as 'json',
          withCredentials: true
        });
      }),
      catchError(this.handleError)
    );
  }
  
}
