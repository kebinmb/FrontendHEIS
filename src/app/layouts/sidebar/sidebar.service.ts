import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  getGoogleUserDetails():Observable<any>{
    return this.http.get(`${this.apiServerUrl}/user/details`,{responseType:'text',withCredentials:true}).pipe(
      map((response:any)=>{
        try{
          return JSON.parse(response);
        }catch(e){
          return e;
        }
      })
    );
  }
}
