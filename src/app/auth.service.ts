import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS for encryption
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '66264672124-0nccv7im2tmkqp7fit6dqekki57a4g94.apps.googleusercontent.com'; // Replace with your client ID
  private redirectUri = 'http://localhost:4200/callback'; // Your Angular app callback URL
  private authUrl = 'http://localhost:8080/oauth2/authorize'; // Your authorization server URL
  private tokenUrl = 'http://localhost:8080/oauth2/token'; // Your token URL
  private secretKey: string = 'chmsu.edu.ph.secret-key.secret';
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const url = `${this.authUrl}?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=code&scope=YOUR_SCOPES`;
    window.location.href = url; // Redirect to authorization server
  }

  handleAuthCallback(code: string) {
    // Exchange the authorization code for tokens
    console.log(code);
    this.http.post(this.tokenUrl, {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      code: code,
      grant_type: 'authorization_code',
    }).subscribe((response: any) => {
      this.storeTokens(response.access_token, response.refresh_token);
      this.getAdminDetailsService().subscribe({
        next: (admin) => {
          this.storeAdminDetails(admin);
        },
        error: (error: any) => {
          console.error("Failed to retrieve admin details", error);
        }
      });
      this.router.navigate(['dashboard']); // Redirect to home after successful login
    });
  }

  storeTokens(accessToken: string, refreshToken: string) {
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

   storeAdminDetails(admin: any) {
    const encryptedUsername = CryptoJS.AES.encrypt(admin.username.toString(), this.secretKey).toString();
    const encryptedAccessLevel = CryptoJS.AES.encrypt(admin.accessLevel.toString(), this.secretKey).toString();
    const encryptedCampus = CryptoJS.AES.encrypt(admin.campus.toString(), this.secretKey).toString();
    const encryptedName = CryptoJS.AES.encrypt(admin.name.toString(), this.secretKey).toString();

    sessionStorage.setItem("username", encryptedUsername);
    sessionStorage.setItem("access_level", encryptedAccessLevel);
    sessionStorage.setItem("campus", encryptedCampus);
    sessionStorage.setItem("name", encryptedName);
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access_level');
    sessionStorage.removeItem('campus');
    sessionStorage.removeItem('name');
    this.router.navigate(['/login']); // Redirect to login page
  }

  getAccessToken() {
    return sessionStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('access_token');
    return !!token;
  }

  getAdminDetailsService(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user/details`, { responseType: 'json', withCredentials: true }).pipe(
      map((response: any) => {
        return response; // Assuming response is already an object
      })
    );
  }

  //Decode the token and return the payload
  decodeToken(token:string):any{
    try{
      return jwtDecode(token);
    }catch(error){
      console.error('Invalid Token',error);
      return null;
    }
  }

  //Check if the token is expired
  isTokenExpired(token:string):boolean{
    const decoded = this.decodeToken(token);
    if(!decoded || !decoded.exp){
      return true;
    }
    const expirationDate = new Date(decoded.exp * 1000); // Convert exp to milliseconds
    return expirationDate < new Date();
  }
    // Handle token expiry and redirect
    handleTokenExpiry(token: string) {
      if (this.isTokenExpired(token)) {
        this.router.navigate(['/access-expired']); // Redirect to the access expired page
      }
    }
}
