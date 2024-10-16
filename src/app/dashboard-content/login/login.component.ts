import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private secretKey: string = 'chmsu.edu.ph.secret-key.secret';
  // constructor(private loginService:LoginService,private routes:Router, private snackBar: MatSnackBar){}
  
  // ngOnInit(){
  //   // sessionStorage.clear();
  // }
  onLogin() {
  
  }

  // login() {
  //   window.location.href = `${environment.apiBaseUrl}/oauth2/authorization/google`; 
  //   this.loginService.insertLog().subscribe({
  //     next: (response: any) => {
  //       console.log(response);
        
  //       // Redirect after logging is complete
        
  //     },
  //     error: (error: any) => {
  //       console.error("Error occurred while logging", error);
  //       // Optionally handle the error, e.g., show a user-friendly message
  //     }
  //   });
  // }
  ngOnInit(){
    
  }
  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(); // Start the OAuth2 login process
  }
}
