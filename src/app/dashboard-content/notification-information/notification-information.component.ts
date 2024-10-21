import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { NotificationInformationServiceService } from './notification-information-service.service';
import { ArchiveService } from '../archive/archive.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReceiverModalComponent } from './receiver-modal/receiver-modal.component';
import { ReceiverModalServiceService } from './receiver-modal/receiver-modal-service.service';

@Component({
  selector: 'app-notification-information',
  templateUrl: './notification-information.component.html',
  styleUrls: ['./notification-information.component.css']
})
export class NotificationInformationComponent implements OnInit {
  listOfDocuments:any[]=[];
  userList:any[]=[];
  documentListWithName:any[]=[];
  displayedColumns: string[] = ['documentNumber', 'receivers', 'sender', 'timestamp'];
  dataSourceNotifications = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorNotifications!: MatPaginator;
  @ViewChild(MatSort) sortNotifications!: MatSort;
  constructor(private receiverModal:ReceiverModalServiceService,private notificationInformationService: NotificationInformationServiceService, private archiveService: ArchiveService, private snackBar:MatSnackBar, private dialog:MatDialog) {
    
    
  }

  ngOnInit(): void {
    this.loadDocumentsAndUsers();
  }

  ngAfterViewInit(): void {
    this.dataSourceNotifications.paginator = this.paginatorNotifications;
    this.dataSourceNotifications.sort = this.sortNotifications;
  }

  private loadDocumentsAndUsers(): void {
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
  const currentYear = new Date().getFullYear();
    this.notificationInformationService.getMonthlyReports(currentMonth.toString(), currentYear.toString()).subscribe({
      next: (documents: any) => {
        this.listOfDocuments = documents;
        this.archiveService.getUserList().subscribe({
          next: (users: any) => {
            this.userList = users;
            this.documentListWithName = this.mapDocumentsWithNames(this.listOfDocuments, this.userList);
            this.loadNotifications();
          },
          error: () => this.showSnackBar('Failed to load user list')
        });
      },
      error: () => this.showSnackBar('Failed to load documents')
    });
  }

  private loadNotifications(): void {
    this.receiverModal.getNotifications().subscribe({
      next: (notifications: any[]) => {
        this.documentListWithName = this.documentListWithName.map((doc: any) => ({
          ...doc,
          alignedReceivers: this.mapReceiversWithViewedStatus(doc.attention, doc.documentNumber, notifications)
        }));
        this.dataSourceNotifications.data = this.documentListWithName;
        console.log('Updated Documents with Aligned Receivers:', this.documentListWithName);
      },
      error: () => this.showSnackBar('Failed to load notifications')
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
  mapDocumentsWithNames(documents: any[], users: any[]): any[] {
    return documents
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
      .sort((a, b) => b.documentNumber - a.documentNumber); // Assuming documentNumber is a numeric value
}


  getNamesFromIds(ids: string): any[] {
    const idArray = ids.split(',').map((id) => id.trim());
    return idArray.map((id) => {
      const user = this.userList.find((user: any) => user.userId.toString() === id);
      return { name: user ? user.name : `Unknown ` };
    });
  }

  getSingleNameFromId(id: string): string {
    const user = this.userList.find((user: any) => user.userId.toString() === id);
    return user ? user.name : id;
  }

  mapReceiversWithViewedStatus(
    attention: string,
    documentNumber: string,
    notifications: any[]
  ): any[] {
    const receiverIds = attention.split(',').map((id) => id.trim());
    
    return receiverIds.map((receiverId) => {
      const user = this.userList.find((user: any) => user.userId.toString() === receiverId);
      
      const matchedNotification = notifications.find(
        (notification: any) =>
          notification.documentId === documentNumber && // Correctly use logical AND (&&)
          notification.receiver.toString() === receiverId // Ensure we are checking against the correct property
      );
      return {
        name: user ? user.name : `Unknown (${receiverId})`,
        viewed: matchedNotification ? matchedNotification.viewed : 'No', // 'No' should be replaced with the correct boolean condition
      };
    });
  }
  

  openModal(document: any): void {
    this.dialog.open(ReceiverModalComponent, {
      data: document,
      width: '80vw',
      maxWidth: '95vw',
      maxHeight: '100vh',
      
    });
  }
  
}
