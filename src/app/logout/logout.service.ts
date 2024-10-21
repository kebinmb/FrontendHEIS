import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
private apiBaseUrl = environment.apiBaseUrl;
private logoutUrl = `${this.apiBaseUrl}/user/logout`;

constructor(private router: Router) {}

// Logout function
logout() {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('access_level');
  sessionStorage.removeItem('campus');
  sessionStorage.removeItem('name');
  this.router.navigate(['/login']); // Redirect to login page
}
}
