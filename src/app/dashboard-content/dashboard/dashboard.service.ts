import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  // public getAdminDetails(){
  //   return this.http.get(`${this.apiBaseUrl}/user/details`,{responseType:'text',withCredentials:true}).pipe(
  //     map((response:any)=>{
  //       try{
  //         return JSON.parse(response);
  //       }catch(e){
  //         console.error('Failed to parse response',e)
  //         return [];
  //       }
  //     })
  //   )
  // }
}
