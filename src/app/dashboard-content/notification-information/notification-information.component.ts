import { Component, ViewChild, OnInit } from '@angular/core';
import { NotificationInformationServiceService } from './notification-information-service.service';
import { ArchiveService } from '../archive/archive.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notification-information',
  templateUrl: './notification-information.component.html',
  styleUrls: ['./notification-information.component.css'],
})
export class NotificationInformationComponent implements OnInit {
<<<<<<< Updated upstream
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
=======
  listOfDocuments: any[] = [];
  userList: any[] = [];
  documentListWithName: any[] = [];
  displayedColumns: string[] = [
    'documentNumber',
    'receivers',
    'sender',
    'timestamp',
  ];

  constructor(
    private receiverModal: ReceiverModalServiceService,
    private notificationInformationService: NotificationInformationServiceService,
    private archiveService: ArchiveService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.notificationInformationService
      .getMonthlyReports('06', '2024')
      .subscribe({
        next: (documents: any) => {
          console.log(documents);
          this.listOfDocuments = documents;

          this.archiveService.getUserList().subscribe({
            next: (users: any) => {
              this.userList = users;
              this.documentListWithName = this.mapDocumentsWithNames(
                this.listOfDocuments,
                this.userList
              );

              // Fetch notifications and align viewed status with receivers
              this.receiverModal.getNotifications().subscribe({
                next: (notifications: any[]) => {
                  this.documentListWithName = this.documentListWithName.map(
                    (doc: any) => {
                      const receivers = this.mapReceiversWithViewedStatus(
                        doc.attention,
                        doc.documentNumber,
                        notifications
                      );
                      return { ...doc, alignedReceivers: receivers };
                    }
                  );

                  console.log(
                    'Updated Documents with Aligned Receivers:',
                    this.documentListWithName
                  );
                },
                error: (error: any) => {
                  this.snackBar.open('Failed to load notifications', 'Close', {
                    duration: 3000,
                  });
                },
              });
            },
            error: (error: any) => {
              this.snackBar.open('Failed to load user list', 'Close', {
                duration: 3000,
              });
            },
          });
        },
        error: (error: any) => {
          this.snackBar.open('Failed to load documents', 'Close', {
            duration: 3000,
          });
        },
      });
  }

  mapDocumentsWithNames(documents: any[], users: any[]): any[] {
    return (
      documents
        .map((doc: any) => {
          const receiverNames = this.getNamesFromIds(doc.attention);
          const senderName = this.getSingleNameFromId(doc.from);

          return {
            ...doc,
            receiver: receiverNames.map((r) => r.name).join(', '),
            sender: senderName,
            receivers: receiverNames, // Store this for use in the modal
          };
        })
        // Sort documents in descending order based on documentNumber
        .sort((a, b) => b.documentNumber - a.documentNumber)
    ); // Assuming documentNumber is a numeric value
  }

  getNamesFromIds(ids: string): any[] {
    const idArray = ids.split(',').map((id) => id.trim());
    return idArray.map((id) => {
      const user = this.userList.find(
        (user: any) => user.userId.toString() === id
      );
      return { name: user ? user.name : `Unknown ` };
>>>>>>> Stashed changes
    });

<<<<<<< Updated upstream
    // Map the receiver field to the corresponding user name from the user list
    const mappedNotifications = filtered.map((notification: any) => {
      const matchedUserReceiver = this.userList.find((user: any) => user.userId === notification.receiver);
      const matchedUserSender = this.userList.find((user: any) => user.userId === notification.sender);

      // Replace receiver ID with the user name if a match is found
=======
  getSingleNameFromId(id: string): string {
    const user = this.userList.find(
      (user: any) => user.userId.toString() === id
    );
    return user ? user.name : id;
  }

  mapReceiversWithViewedStatus(
    attention: string,
    documentNumber: string,
    notifications: any[]
  ): any[] {
    const receiverIds = attention.split(',').map((id) => id.trim());

    return receiverIds.map((receiverId) => {
      const user = this.userList.find(
        (user: any) => user.userId.toString() === receiverId
      );

      const matchedNotification = notifications.find(
        (notification: any) =>
          notification.documentId === documentNumber && // Correctly use logical AND (&&)
          notification.receiver.toString() === receiverId // Ensure we are checking against the correct property
      );

      console.log(matchedNotification);

>>>>>>> Stashed changes
      return {
        ...notification,
        sender: matchedUserSender ? matchedUserSender.name : notification.sender,
        receiver: matchedUserReceiver ? matchedUserReceiver.name : notification.receiver // Fallback to receiver ID if no match
      };
    });
<<<<<<< Updated upstream

    // Update the MatTableDataSource with filtered data
    this.filteredNotifications.data = mappedNotifications;
    this.filteredNotifications.paginator = this.paginatorNotification; // Connect paginator
    this.filteredNotifications.sort = this.sortNotifications; // Connect sorting

    console.log('Filtered Notifications with mapped receiver names:', this.filteredNotifications.data);
=======
  }

  openModal(document: any): void {
    this.dialog.open(ReceiverModalComponent, {
      data: document,
      width: '80vw',
      maxWidth: '95vw',
      maxHeight: '100vh',
    });
>>>>>>> Stashed changes
  }
}
