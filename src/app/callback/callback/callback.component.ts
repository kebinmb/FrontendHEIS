import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  admin: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.tokenService.getToken().subscribe({
      next: (response: any) => {
        this.accessToken = response.accessToken || null;
        this.refreshToken = response.refreshToken || null;

        if (this.accessToken && this.refreshToken) {
          // Store tokens
          this.authService.storeTokens(this.accessToken, this.refreshToken);
          
          // Fetch and store admin details
          //Pass the documentId in this code
          this.authService.getAdminDetailsService().subscribe({
            next: (adminDetails: any) => {
              this.admin = adminDetails;
              this.authService.storeAdminDetails(this.admin);
              if(this.admin.accessLevel === '1'){
                this.router.navigate(['dashboard']); // Redirect to dashboard after storing details
              }else{
                this.router.navigate(['notifications/:documentId'])
              }
            },
            error: (error) => {
              console.error("Failed to retrieve admin details", error);
            }
          });
        } else {
          console.error("Tokens not found in the response");
        }
      },
      error: (error) => {
        console.error("An error occurred while retrieving tokens", error);
      }
    });
  }
}
