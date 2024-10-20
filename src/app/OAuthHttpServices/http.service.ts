import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
token:string | null="";
apiBaseUrl:string = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  get(url:string):any{
    return this.http.get("http://localhost:8080"+url);
  }

  getPrivate(url: string): any {
    this.token = sessionStorage.getItem("access_token");
    return this.http.get("http://localhost:8080" + url, {headers: new HttpHeaders({"Authorization": "Bearer " + this.token})});
  }

  getToken(code: string): Observable<any> {
    return this.http.get<any>("http://localhost:8080/auth/callback?code=" + code, {observe: "response"})
      .pipe(map((response: HttpResponse<any>) => {
        if (response.status === 200 && response.body !== null) {
          this.token = response.body.token;
          return this.token;
        } else {
          return false;
        }
      }));
  }

  // getToken(code: string): Observable<any> {
  //   return this.http.get<any>("http://localhost:8080/auth/callback?code=" + code, {observe: "response"})
  //     .pipe(map((response: HttpResponse<any>) => {
  //       if (response.status === 200 && response.body !== null) {
  //         this.token = response.body.token;
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }));
  // }
}
