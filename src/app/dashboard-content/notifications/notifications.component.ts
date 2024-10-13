import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from './notification.service';
import { TokenService } from 'src/app/token.service';
import { jwtDecode } from "jwt-decode";  // Import jwt-decode
import { AuthService } from 'src/app/auth.service';

interface DecodedTokenPayload {
  sub: string; // Subject (user ID)
  name: string; // User's name
  email: string; // User's email
  // Add other fields that are part of your JWT payload
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notificationCount: number = 0; // Initialize with a default value
  documentDetails: any[] = []; // Initialize as an empty array
  documentImage :string[] = [];
  newNotification: any = {
    notificationId: null,
    sender: '',
    receiver: null,
    documentId: null,
    viewed: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  documentId: number | null = null; // Initialize as null
  accessToken: any;
  decodedTokenPayload: any[] = []; // Initialize an array to store the decoded token payload
  loggedInUser:any;
  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.fetchNotificationCount();
    this.getDocumentIdFromParams();
    
  }

  private fetchNotificationCount() {
    // Fetch the latest notification count
    this.notificationService.getLatestNotificationCount().subscribe({
      next: (response: number) => {
        this.notificationCount = response;
        console.log('Notification Count:', this.notificationCount);
      },
      error: (error: any) => {
        console.error('Error fetching notification count:', error);
      }
    });
  }

  private getDocumentIdFromParams() {
    // Access the documentId from the route parameters
    this.route.paramMap.subscribe(params => {
      const documentIdParam = params.get('documentId'); // Get the documentId parameter
      if (documentIdParam) { // Check if documentIdParam is not null
        this.documentId = +documentIdParam; // Convert the string to a number
        console.log('Document ID:', this.documentId);
        
        // Call the method to fetch document details
        this.getDocumentDetails(this.documentId);
      } else {
        console.error('Document ID is null');
      }
    });
  }

  private getDocumentDetails(documentId: number) {
    // Fetch the access token first
    this.tokenService.getToken().subscribe({
      next: (tokenResponse: any) => {
        this.accessToken = tokenResponse.accessToken; // Store the access token
  
        // Decode the JWT token
        // const decodedPayload: DecodedTokenPayload = jwt_decode(this.accessToken); // Decode the token
        // this.decodedTokenPayload.push(decodedPayload); // Store the payload in the array
        // console.log('Decoded JWT Payload:', decodedPayload);
  
        // Fetch document details after obtaining the access token
        this.notificationService.getDocumentDetails(documentId).subscribe({
          next: (response: any) => {
            this.documentDetails = response;
            console.log('Document Details:', this.documentDetails);

            const filenames = this.notificationService.parseFilenames(response.attachment);
            console.log("File Names:",filenames);
            this.documentImage = this.notificationService.generateUrls(filenames);
            
            // Populate newNotification after fetching document details
            this.newNotification.documentId = response.documentNumber;
            this.newNotification.sender = response.from;
            
            // Fetch logged-in user details to set the receiver
            this.authService.getAdminDetailsService().subscribe({
              next: (userResponse: any) => {
                this.loggedInUser = userResponse;
                console.log(this.loggedInUser.userId);
                this.newNotification.receiver = this.loggedInUser.userId;
                this.newNotification.notificationId = this.notificationCount;
            this.newNotification.viewed = "1"; // Assuming "1" means viewed
            
            // Call createNotification after populating newNotification
            this.createNotification(); // Set the receiver from logged-in user details
              },
              error: (error: any) => {
                console.error("An error occurred while fetching user details:", error);
              }
            });
            
            
          },
          error: (error) => {
            console.error('Error fetching document details:', error);
          }
        });
      },
      error: (error: any) => {
        console.error("An error occurred while fetching the token:", error);
      }
    });
  }

  createNotification() {
    this.notificationService.insertNotification(this.newNotification).subscribe({
      next: (response) => {
        this.successMessage = 'Notification inserted successfully!';
        this.errorMessage = null;  // Clear error message if any
        console.log('Notification inserted successfully:', response);
      },
      error: (error) => {
        this.errorMessage = 'Error inserting notification: ' + error;
        this.successMessage = null;  // Clear success message if any
        console.error('Error inserting notification:', error);
      }
    });
  }
}
