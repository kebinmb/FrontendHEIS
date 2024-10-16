import { CanActivateFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service'; // Adjust the import path as necessary
import { catchError, map, of } from 'rxjs';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);
  const authService = inject(AuthService); // Inject AuthService

  // Check if Google cookies (HSID or SID) are available
  if (googleCookiesExist() || sessionStorage.getItem('name')) {
    // If sessionStorage has user info, or Google cookies exist, the user is logged in
    const adminDetails = sessionStorage.getItem('name'); // Retrieve admin details from storage
    if (adminDetails) {
      showLoginSnackbar(snackBar);
      router.navigate(['dashboard/dashboard-info']); // Redirect to dashboard
      return false; // Prevent access to the login route
    } else {
      // If admin details are not found in storage, redirect to login
      router.navigate(['login']); 
      return false; // Prevent access to the login route
    }
  }

  // Allow access to login
  return true; // Allow access to login
};

// Helper to check for Google cookies (HSID or SID)
function googleCookiesExist(): boolean {
  const cookies = document.cookie.split('; ');
  return cookies.some(cookie => cookie.startsWith('HSID=') || cookie.startsWith('SID='));
}

// Helper to display Snackbar message
function showLoginSnackbar(snackBar: MatSnackBar): void {
  snackBar.open('You are already logged in!', 'Close', {
    duration: 3000, // Snackbar visible for 3 seconds
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
}
