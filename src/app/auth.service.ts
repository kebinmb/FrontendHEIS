import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '66264672124-0nccv7im2tmkqp7fit6dqekki57a4g94.apps.googleusercontent.com'; // Replace with your client ID
  private redirectUri = 'http://localhost:4200/callback'; // Your Angular app callback URL
  private authUrl = 'http://localhost:8080/oauth2/authorize'; // Your authorization server URL
  private tokenUrl = 'http://localhost:8080/oauth2/token'; // Your token URL

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const url = `${this.authUrl}?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=code&scope=YOUR_SCOPES`;
    window.location.href = url; // Redirect to authorization server
  }

  handleAuthCallback(code: string) {
    // Exchange the authorization code for tokens
    return this.http.post(this.tokenUrl, {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      code: code,
      grant_type: 'authorization_code',
    }).subscribe((response: any) => {
      // Store tokens in session storage
      sessionStorage.setItem('access_token', response.access_token);
      sessionStorage.setItem('refresh_token', response.refresh_token);
      this.router.navigate(['/']); // Redirect to home after successful login
    });
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    this.router.navigate(['/login']); // Redirect to login page
  }

  getAccessToken() {
    return sessionStorage.getItem('access_token');
  }
}
