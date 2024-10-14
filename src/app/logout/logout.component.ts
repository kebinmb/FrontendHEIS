import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService:AuthService,private snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.authService.logout(); // Call the logout method
    this.clearSessionAndCookies();
    this.openLogoutSnackbar(); // Show the snackbar after logout
  }

  // Snackbar function to display logout success message
  openLogoutSnackbar(): void {
    this.snackBar.open('You have successfully logged out.', 'OK', {
      duration: 3000, // 3 seconds duration
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  clearSessionAndCookies(): void {
    // Clear session storage
    sessionStorage.clear();

    // Clear cookies by setting their expiration date to the past
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}
