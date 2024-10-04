import { Component, ViewChild } from '@angular/core';
import { ArchiveService } from './archive.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentDetailsModalComponent } from './document-details-modal/document-details-modal.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent {
  @ViewChild('paginatorArchives', { static: true }) paginatorArchives: MatPaginator;
  @ViewChild(MatSort) sortArchives: MatSort;
  displayedColumnsArchives: string[] = ['documentNumber', 'type', 'userNameSender', 'userName', 'subject', 'timestamp'];
  dataSourceArchives: MatTableDataSource<any>;
  selectedMonth: string;
  selectedYear: number;
  //Arrays
  userArray:any[] = [];
  finalArchivesArray: any[] = [];
  archiveArray:any[] = [];

  months = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },
  ];
  years: number[] = [];
  isLoading: boolean = false;
  constructor(
    private archiveService: ArchiveService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    // Admin Details
    this.archiveService.getAdminDetails().subscribe({
      next: (response: any) => {
        console.log("Admin Details:", response);
      },
      error: (error: any) => {
        console.error("An error occurred while fetching Admin Details", error);
      }
    });
  
    // Fetch the archive list
    this.archiveService.getArchives().subscribe({
      next: (archives: any) => {
        this.archiveArray = archives;
        console.log(this.archiveArray);
  
        // Fetch the user list
        this.archiveService.getUserList().subscribe({
          next: (users: any) => {
            this.userArray = users;
            console.log(this.userArray);
  
            // Create finalArchivesArray
            this.finalArchivesArray = this.archiveArray.map((archive: any) => {
              const user = users.find((user: any) => user.userId.toString() === archive.attention);
              const sender = users.find((sender: any) => sender.userId.toString() === archive.from);
  
              // Check if attention exists and is not null
              const receiverNames = archive.attention 
                ? archive.attention.split(',').map((attention: string) => {
                    const receiver = users.find((user: any) => user.userId.toString() === attention.trim());
                    return receiver ? receiver.name : 'Unknown Receiver';
                  })
                : ['Unknown Receiver'];  // Default to 'Unknown Receiver' if attention is null or undefined
                
              return {
                ...archive, // Correctly spread the archive object
                userName: user ? user.name : 'Unknown User',
                userNameSender: sender ? sender.name : 'Unknown Sender',
                receiverNames: receiverNames // Handle null or empty attention field
              };
            });
  
            this.dataSourceArchives = new MatTableDataSource(this.finalArchivesArray);
            this.dataSourceArchives.paginator = this.paginatorArchives;
            this.dataSourceArchives.sort = this.sortArchives;
  
            // Optionally log the final array
            console.log(this.finalArchivesArray);
          },
          error: (err) => {
            this.snackBar.open("Error in fetching user list", "Close", {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        });
      },
      error: (err) => {
        this.snackBar.open("Error in fetching archive list", "Close", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }
  
  filterData() {
    if (this.selectedMonth && this.selectedYear) {
      this.dataSourceArchives.data = this.finalArchivesArray.filter((archive) => {
        const date = new Date(archive.timestamp);
        return (
          date.getMonth() + 1 === parseInt(this.selectedMonth) &&
          date.getFullYear() === this.selectedYear
        );
      });
    } else {
      this.dataSourceArchives.data = this.finalArchivesArray;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceArchives.filter = filterValue.trim().toLowerCase();
  }

  openDialog(document: any): void {
    const dialogRef = this.dialog.open(DocumentDetailsModalComponent, {
      width: '80vw',
      maxWidth: '95vw',
      maxHeight: '100vh',
      height: '80vh',
      data: document
    });
  }

 
}
