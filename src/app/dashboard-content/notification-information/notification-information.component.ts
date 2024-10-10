import { Component, ViewChild, OnInit } from '@angular/core';
import { NotificationInformationServiceService } from './notification-information-service.service';
import { ArchiveService } from '../archive/archive.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notification-information',
  templateUrl: './notification-information.component.html',
  styleUrls: ['./notification-information.component.css']
})
export class NotificationInformationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginatorNotification: MatPaginator;
  @ViewChild(MatSort) sortNotifications: MatSort;

  notifications: any[] = [];
  filteredNotifications: MatTableDataSource<any> = new MatTableDataSource(); // Use MatTableDataSource for pagination and sorting
  currentMonth: string; // Dynamic current month
  currentYear: string;  // Dynamic current year
  displayedColumns: string[] = ['documentId', 'notificationId', 'sender', 'receiver', 'viewed', 'timestamp'];
  userList: any[] = []; // Ensure userList is an array

  constructor(private notificationInformationService: NotificationInformationServiceService, private archiveService: ArchiveService) {
    const currentDate = new Date();
    this.currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Convert to 'MM' format
    this.currentYear = currentDate.getFullYear().toString(); // Convert year to 'YYYY' format
  }

  ngOnInit() {
    // Fetch the user list first
    this.archiveService.getUserList().subscribe({
      next: (userResponse: any) => {
        this.userList = userResponse; // Store the user list
        console.log(this.currentMonth);
        console.log(this.currentYear);

        // After fetching the user list, fetch the notifications
        this.notificationInformationService.getNotifications().subscribe({
          next: (notificationResponse: any) => {
            this.notifications = notificationResponse;
            this.filterNotificationsByMonth(this.currentMonth, this.currentYear);
          },
          error: (error: any) => {
            console.error("An error occurred while fetching notifications", error);
          }
        });
      },
      error: (error: any) => {
        console.error("An error occurred while fetching the user list", error);
      }
    });
  }

  // Method to filter notifications based on the current month and year
  filterNotificationsByMonth(month: string, year: string) {
    // Filter notifications by month and year
    const filtered = this.notifications.filter((notification: any) => {
      const notificationDate = new Date(notification.timestamp);
      const notificationMonth = ('0' + (notificationDate.getMonth() + 1)).slice(-2); // 'MM'
      const notificationYear = notificationDate.getFullYear().toString(); // 'YYYY'

      // Check if the notification's month and year match the current month and year
      return notificationMonth === month && notificationYear === year;
    });

    // Map the receiver field to the corresponding user name from the user list
    const mappedNotifications = filtered.map((notification: any) => {
      const matchedUserReceiver = this.userList.find((user: any) => user.userId === notification.receiver);
      const matchedUserSender = this.userList.find((user: any) => user.userId === notification.sender);

      // Replace receiver ID with the user name if a match is found
      return {
        ...notification,
        sender: matchedUserSender ? matchedUserSender.name : notification.sender,
        receiver: matchedUserReceiver ? matchedUserReceiver.name : notification.receiver // Fallback to receiver ID if no match
      };
    });

    // Update the MatTableDataSource with filtered data
    this.filteredNotifications.data = mappedNotifications;
    this.filteredNotifications.paginator = this.paginatorNotification; // Connect paginator
    this.filteredNotifications.sort = this.sortNotifications; // Connect sorting

    console.log('Filtered Notifications with mapped receiver names:', this.filteredNotifications.data);
  }
}
