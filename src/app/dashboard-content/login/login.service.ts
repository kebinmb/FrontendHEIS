import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  // login(){
  //   window.location.href = "http://localhost:8080/oauth2/authorization/google";
  // }
  // insertLog():Observable<any[]>{
  //   return this.http.get(`${this.apiBaseUrl}/logs/insertloginlog`,{responseType:'text',withCredentials:true}).pipe(map((response:any)=>{
  //     try{
  //       return JSON.parse(response);
  //     }catch(e){
  //       console.error('Failed to parse response',e)
  //       return [];
  //     }
  //   }))
  // }
  
}
