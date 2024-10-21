import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TokenService } from 'src/app/token.service';
import * as CryptoJS from 'crypto-js';
import { HttpService } from 'src/app/OAuthHttpServices/http.service';
import { Observable, map, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  admin: any;
  documentId: string | null = null;
  private secretKey: string = 'chmsu.edu.ph.secret-key.secret';
  url: string = "";
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute ,
    private http:HttpService
  ) {}

  ngOnInit() {
    // Subscribe to query params to retrieve documentId
    this.route.queryParams.subscribe(params => {
      this.documentId = params['documentId'];
  
      // Check if documentId exists and store it in session storage
      if (this.documentId) {
        sessionStorage.setItem("documentId", this.documentId);
      } else {
        alert("No document ID found");
      }
    });
  
    // Fetch the auth URL after handling documentId
    this.http.get("/auth/url").subscribe({
      next: (data: any) => {
        this.url = data.authUrl;
        // Redirect to the auth URL
        window.location.href = this.url;
      },
      error: (err: any) => {
        console.error("Error fetching auth URL:", err);
      }
    });
  
    // Handle login if the code is present in the query params
    this.route.queryParams.subscribe(params => {
      if (params["code"]) {
        this.handleLogin(params["code"]);
      }
    });
  }
  handleLogin(code:string){
    this.http.getTokenNotif(code).subscribe({
      next: (result: any) => {
        sessionStorage.setItem("access_token",result)
        if (result) {
          this.getAdminDetailsService().subscribe({
            next: (admin: any) => {
              alert(sessionStorage.getItem("documentId"))
              this.storeAdminDetails(admin);
              this.navigateToNotifications();
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

  private navigateToNotifications() {
    const storedDocumentId = sessionStorage.getItem('documentId');
    if (storedDocumentId) {
      this.router.navigate([`notifications/${storedDocumentId}`]);
    } else {
      this.router.navigate(['notifications']); // Fallback to notifications if no documentId
    }
    // Clear the stored documentId after navigation
    localStorage.removeItem('documentId');
  }
  // Helper to check for Google cookies (HSID or SID)
  private googleCookiesExist(): boolean {
    const cookies = document.cookie.split('; ');
    return cookies.some(cookie => cookie.startsWith('HSID=') || cookie.startsWith('SID='));
  }
  //   // Capture documentId from URL query params
  //   this.route.queryParams.subscribe(params => {
  //     this.documentId = params['documentId']; // Use query params to get documentId
  //     if (this.documentId) {
  //       // Store documentId in local storage for later use
  //       localStorage.setItem('documentId', this.documentId);
  //     }
  //   });

  //   // Retrieve tokens
  //   this.tokenService.getToken().subscribe({
  //     next: (response: any) => {
  //       this.accessToken = response.accessToken || null;
  //       this.refreshToken = response.refreshToken || null;
    
  //       if (this.accessToken && this.refreshToken) {
  //         // Store tokens
  //         this.authService.storeTokens(this.accessToken, this.refreshToken);
          
  //         // Fetch and store admin details
  //         this.authService.getAdminDetailsService().subscribe({
  //           next: (adminDetails: any) => {
  //             this.admin = adminDetails;
  //             this.authService.storeAdminDetails(this.admin);
    
  //             // Check session storage and Google cookies
  //             const encryptedAccessLevel = sessionStorage.getItem('access_level');
  //             if (!encryptedAccessLevel && this.googleCookiesExist()) {
  //               // Decrypt and use the access level if Google cookies are present
  //               const decryptedBytes = CryptoJS.AES.decrypt(encryptedAccessLevel!, this.secretKey);
  //               const decryptedAccessLevel = decryptedBytes.toString(CryptoJS.enc.Utf8);
                
  //               console.log('Decrypted Access Level:', decryptedAccessLevel);
    
  //               // Navigate according to access level
  //               if (decryptedAccessLevel === '1') {
  //                 this.router.navigate(['dashboard/dashboard-info']); // Redirect to dashboard
  //               } else {
  //                 this.navigateToNotifications();
  //               }
  //             } else if (encryptedAccessLevel) {
  //               // Handle the case where access level is available in session storage
  //               const decryptedBytes = CryptoJS.AES.decrypt(encryptedAccessLevel, this.secretKey);
  //               const decryptedAccessLevel = decryptedBytes.toString(CryptoJS.enc.Utf8);
                
  //               console.log('Decrypted Access Level:', decryptedAccessLevel);
    
  //               // Navigate according to access level
  //               if (decryptedAccessLevel === '1') {
  //                 this.router.navigate(['dashboard/dashboard-info']); // Redirect to dashboard
  //               } else {
  //                 this.navigateToNotifications();
  //               }
  //             } else {
  //               console.log('No encrypted access level found in sessionStorage.');
  //             }
  //           },
  //           error: (error) => {
  //             console.error("Failed to retrieve admin details", error);
  //           }
  //         });
  //       } else {
  //         console.error("Tokens not found in the response");
  //         this.handleTokenError();
  //       }
  //     },
  //     error: (error) => {
  //       console.error("An error occurred while retrieving tokens", error);
  //       this.handleTokenError();
  //     }
  //   });
  // }
    
    

  // private handleTokenError() {
  //   // Check if documentId is available
  //   if (this.documentId) {
  //     // Redirect to Google login
  //     window.location.href = 'http://localhost:8080/oauth2/authorize';
  //   } else {
  //     // If documentId is not available, just navigate to the login page
  //     window.location.href = 'http://localhost:8080/login/oauth2/code/google';
  //   }
  // }

  
}
