import { Component, ViewChild } from '@angular/core';
import { ArchiveService } from './archive.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentDetailsModalComponent } from './document-details-modal/document-details-modal.component';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  currentYear: string;
  
  // Arrays
  userArray: any[] = [];
  finalArchivesArray: any[] = [];
  archiveArray: any[] = [];
  
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
    //Make this dynamic year
    this.currentYear = new Date().getFullYear().toString();
    forkJoin({
      archives: this.archiveService.getArchives(this.currentYear).pipe(catchError((error) => {
        this.snackBar.open("Error in fetching archive list", "Close", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        return of([]);
      }))
    }).subscribe({
      next: ({  archives }) => {
        this.archiveArray = archives;
        this.dataSourceArchives = new MatTableDataSource(this.archiveArray);
        this.dataSourceArchives.paginator = this.paginatorArchives;
        this.dataSourceArchives.sort = this.sortArchives;
        console.log(this.finalArchivesArray);
      },
      error: (err) => {
        console.error("Error fetching data", err);
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
