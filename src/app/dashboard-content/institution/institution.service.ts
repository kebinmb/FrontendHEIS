import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, switchMap, of } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getDepartmentDetails(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Replace with your actual token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        });
        return this.http.get(`${this.apiServerUrl}/department/departdetails`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true,
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response) || []; // Parse and return, or return an empty array
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

  getUserList(): Observable<any[]> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Use the actual token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        });
        return this.http.get(`${this.apiServerUrl}/user/users`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true,
        });
      }),
      map((response: string) => {
        try {
          return JSON.parse(response) || []; // Parse and return an empty array if null/undefined
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

  addNewDepartment(formData: FormData): Observable<string> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Use the actual token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // Add token in the Authorization header
        });
        return this.http.post<any>(
          `${this.apiServerUrl}/department/newdep`,
          formData,
          {
            headers: headers,
            responseType: 'text' as 'json',
            withCredentials: true,
          }
        );
      }),
      catchError((error) => {
        console.error('Failed to add new department', error);
        return throwError(() => new Error('Failed to add new department')); // Return error message
      })
    );
  }

  editDepartmentDetails(
    id: number,
    department: any,
    name: string
  ): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Use the actual token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        });
        const params = new HttpParams().set('name', name); // Set query parameter

        return this.http.put<any>(
          `${this.apiServerUrl}/department/edit/${id}`,
          department,
          {
            headers: headers,
            params: params,
            responseType: 'json',
            withCredentials: true,
          }
        );
      }),
      catchError((error) => {
        console.error('Failed to edit department details', error);
        return throwError(() => new Error('Failed to edit department details')); // Return error message
      })
    );
  }

  deleteDepartment(id: number): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Use the actual token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // Add token in the Authorization header
        });
        return this.http.delete(`${this.apiServerUrl}/department/del/${id}`, {
          headers: headers,
          withCredentials: true,
        });
      }),
      catchError((error) => {
        console.error('Failed to delete department', error);
        return throwError(() => new Error('Failed to delete department'));
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.delete(
          `${this.apiServerUrl}/department/del/user/${id}`,
          {
            headers: headers,
            withCredentials: true,
          }
        );
      }),
      catchError((error) => {
        console.error('Failed to delete user', error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }

  addNewUser(formData: any): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.post<any>(
          `${this.apiServerUrl}/department/new/user`,
          formData,
          {
            headers: headers,
            withCredentials: true,
          }
        );
      }),
      catchError((error) => {
        console.error('Failed to add new user', error);
        return throwError(() => new Error('Failed to add new user'));
      })
    );
  }

  getTotalUser(): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken; // Retrieve the token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // Add the token to Authorization header
        });
        return this.http.get(`${this.apiServerUrl}/department/user/total`, {
          headers: headers,
          responseType: 'text',
          withCredentials: true,
        });
      }),
      map((response: any) => {
        try {
          return JSON.parse(response); // Parse the JSON response
        } catch (e) {
          console.error('Failed to parse response', e);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Failed to fetch total user count', error);
        return throwError(() => new Error('Failed to fetch total user count'));
      })
    );
  }

  editUserDetails(id: number, user: any, name: string): Observable<any> {
    return this.tokenService.getToken().pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        const params = new HttpParams().set('name', name); // Set query params
        return this.http.put<any>(
          `${this.apiServerUrl}/department/edit/user/${id}`,
          user,
          {
            headers: headers,
            params: params,
            responseType: 'json',
            withCredentials: true,
          }
        );
      }),
      catchError(this.handleErrorDetailed('editUserDetails', user)) // Handle errors
    );
  }

  // Improved handleErrorDetailed method
  private handleErrorDetailed<T>(operation = 'operation', formData?: FormData) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      if (formData) {
        console.error(`Form Data: ${JSON.stringify(formData)}`);
      }
      console.error('Error Details:', error);

      // Optionally log the error to a backend server or monitoring service

      return throwError(() => ({
        status: error.status,
        message: `An error occurred during ${operation}: ${error.message}`,
        error: error.error,
      }));
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle the error here (log it, transform it, etc.)
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
