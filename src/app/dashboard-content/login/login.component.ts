import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { HttpService } from 'src/app/OAuthHttpServices/http.service';
import { catchError, map, Observable, throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  url: string = "";
  private loginInitiated = false;
  apiBaseUrl: string = environment.apiBaseUrl;
  private secretKey: string = 'chmsu.edu.ph.secret-key.secret';
  componentToShow: string = "public";
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.http.get("/auth/url").subscribe({
      next: (data: any) => {
        this.url = data.authUrl; // Store the auth URL
        console.log(data);
      },
      error: (err: any) => {
        console.error("Error fetching auth URL:", err);
      }
    });

    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params["code"]) {
        this.handleLogin(params["code"]);
      }
    });
  }

  onLoginButtonClick(): void {
    if (!this.loginInitiated) {
      this.loginInitiated = true; // Set flag to true
      window.location.href = this.url; // Redirect to the auth URL
    }
  }

  private handleLogin(code: string): void {
    this.http.getToken(code).subscribe({
      next: (result: any) => {
        sessionStorage.setItem("access_token", result)
        if (result) {
          this.getAdminDetailsService().subscribe({
            next: (admin: any) => {
              this.storeAdminDetails(admin);
              const accessLevel = sessionStorage.getItem("access_level")
              if (accessLevel) {
                const decryptedAccesLevel = CryptoJS.AES.decrypt(accessLevel, this.secretKey);
                const BytesToString = decryptedAccesLevel.toString(CryptoJS.enc.Utf8);
                if (BytesToString) {
                  if (BytesToString === "1") {
                    this.http.postPrivate("/logs/insertloginlog").subscribe({
                      next:(data:any)=>{
                        console.log("logs posted",data);
                      }
                    });
                    this.router.navigate(['/dashboard/dashboard-info'])
                  } else {
                    this.navigateToNotifications()
                  }
                }; // Navigate to dashboard
              }
            },
            error: (error: any) => {
              console.error("Error fetching user details:", error);
            }
          });
        } else {
          console.log("No valid code received");
        }
      },
      error: (err: any) => {
        console.error("Error fetching token:", err);
      }
    });
  }

  private navigateToNotifications() {
    const storedDocumentId = sessionStorage.getItem('documentId');
    if (storedDocumentId) {
      this.router.navigate([`notifications/${storedDocumentId}`]);
    } else {
      this.router.navigate(['notifications']); // Fallback to notifications if no documentId
    }
    // Clear the stored documentId after navigation
    sessionStorage.removeItem('documentId');
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
    return this.http.getPrivate("/user/details").pipe(
      map((response: any) => {
        console.log(response); // Log the response
        return response; // Return the response
      }),
      catchError((err: any) => {
        console.error("Error fetching user details:", err);
        return throwError(err); // Propagate the error
      })
    );
  }

}
