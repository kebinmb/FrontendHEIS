import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Assuming you have an AuthService to handle authentication
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS for decryption

export const authViewGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const secretKey = 'chmsu.edu.ph.secret-key.secret'; // Define your secret key
  
  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    const encryptedAccessLevel = sessionStorage.getItem('access_level');
    const decryptedAccessLevel = decryptValue(encryptedAccessLevel, secretKey);
    console.log(decryptedAccessLevel);

    // Allow access if access_level is not '1'
    if (decryptedAccessLevel !== '1') {
      return true; // User has the required access level, allow access
    }

    // If the access level is '1', redirect to login
    router.navigate(['login']);
    return false; // Block access to the route
  } else {
    // User is not authenticated, redirect to login
    router.navigate(['login']);
    return false; // Block access to the route
  }
};

// Decrypt function
function decryptValue(encryptedValue: string | null, secretKey: string): string {
  if (encryptedValue) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return '';
}
