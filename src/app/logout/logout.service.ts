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
logout(): void {
  this.clearSessionAndCookies(); // Clear session data
  this.redirectToLogout(); // Redirect to OAuth2 logout
}

// Clear localStorage, sessionStorage, and cookies
private clearSessionAndCookies(): void {
  sessionStorage.clear();
  localStorage.clear();

  // Clear cookies (set expiry to past date)
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name] = cookie.split('=');
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

// Redirect to OAuth2 logout URL
private redirectToLogout(): void {
  window.location.href = this.logoutUrl;
}
}
