import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notificationCount:number;
  documentDetails:any;
  newNotification: any = {
    notificationId: null,
    sender: '',
    receiver: '',
    documentId: null,
    viewed: ''
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private notificationService: NotificationService) { }
  ngOnInit(){
    const notifCount = this.notificationService.getLatestNotificationCount().subscribe({
      next:((response:any)=>{
        this.notificationCount = response;
        this.newNotification.notificationId = response;
        console.log(this.notificationCount);
      }),error:((error:any)=>{
        console.error(error);
      })
    });

    this.getDocumentDetails();
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
  
  getDocumentDetails(){
    const documentId = 38812;
    this.notificationService.getDocumentDetails(documentId).subscribe(
      response=>{
        this.documentDetails = response;
        console.log(this.documentDetails);
      },
      error=>{
        console.error('Error fetching document details:',error);
      }
    )
  }
}
