import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notificationCount: number;
  documentDetails: any;
  newNotification: any = {
    notificationId: null,
    sender: '',
    receiver: '',
    documentId: null,
    viewed: ''
  };
  imageUrls: string[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  documentId: number;
  constructor(private notificationService: NotificationService, private route: ActivatedRoute) { }
  ngOnInit() {
    // Fetch the latest notification count
    this.notificationService.getLatestNotificationCount().subscribe({
      next: (response: any) => {
        this.notificationCount = response;
        this.newNotification.notificationId = response;
        console.log(this.notificationCount);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  
    // Access the documentId from the route parameters
    this.route.paramMap.subscribe(params => {
      const documentIdParam = params.get('documentId'); // Get the documentId parameter
  
      // Check if documentIdParam is not null before converting it to a number
      if (documentIdParam !== null) {
        this.documentId = +documentIdParam; // Convert the string to a number
        console.log('Document ID:', this.documentId);
        // Call the service or method using the documentId
        this.getDocumentDetails(this.documentId);
      } else {
        console.error('Document ID is null');
      }
    });
  }
  createNotification() {
    this.notificationService.insertNotification(this.newNotification).subscribe(
      response => {
        this.successMessage = 'Notification inserted successfully!';
        this.errorMessage = null;  // Clear error message if any
        console.log('Notification inserted successfully:', response);
      },
      error => {
        this.errorMessage = 'Error inserting notification: ' + error;
        this.successMessage = null;  // Clear success message if any
        console.error('Error inserting notification:', error);
      }
    );
  }

  getDocumentDetails(documentId: number) {
    this.notificationService.getDocumentDetails(documentId).subscribe(
      response => {
        this.documentDetails = response;
        console.log(this.documentDetails);
      },
      error => {
        console.error('Error fetching document details:', error);
      }
    )
  }
}
