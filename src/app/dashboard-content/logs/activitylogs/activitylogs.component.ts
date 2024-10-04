import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUserLogsList } from '../logs-user-state-manager/logs-user.actions';
import { UserLogsState } from '../logs-user-state-manager/logs-user.reducer';
import { selectUserLogsList, selectUserLogsLoading, selectUserLogsFailure } from '../logs-user-state-manager/logs-user.selector';
import { LogsService } from '../logs.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-activitylogs',
  templateUrl: './activitylogs.component.html',
  styleUrls: ['./activitylogs.component.css']
})
export class ActivitylogsComponent {
  logs: any[] = [];
  currentDate: string;
  userArray: any[] = [];
  finalLogsArray: any[] = [];
  userLogsListArray$: Observable<any[]>;
  loadingUserLogsList$: Observable<boolean>;
  errorUserLogsList$: Observable<any[]>;
displayedColumns: string[] = ['date', 'userName', 'action'];
  constructor(private store: Store<{ userLogsList: UserLogsState }>, private logsService: LogsService) {
    this.userLogsListArray$ = this.store.pipe(select(selectUserLogsList));
    this.loadingUserLogsList$ = this.store.pipe(select(selectUserLogsLoading));
    this.errorUserLogsList$ = this.store.pipe(select(selectUserLogsFailure));
  }

  ngOnInit() {
    this.store.dispatch(loadUserLogsList());
    this.currentDate = this.getCurrentDateString();

    const campus = sessionStorage.getItem('campus');
    let decryptedCampus: string | null = null;

    if (campus) {
      try {
        const bytes = CryptoJS.AES.decrypt(campus, 'chmsu.edu.ph.secret-key.secret');
        decryptedCampus = bytes.toString(CryptoJS.enc.Utf8);

        // Optionally check if decryptedCampus is empty or invalid
        if (!decryptedCampus) {
          console.error('Decryption resulted in an empty value.');
        }
      } catch (error) {
        console.error('Error during decryption:', error);
      }
    } else {
      console.warn('No campus data found in sessionStorage.');
    }

    // ////console.log('Decrypted Campus:', decryptedCampus);

    // Use the decrypted value or handle null case
    this.loadUserMaintenanceLogs(this.currentDate, decryptedCampus);
  }

  loadUserMaintenanceLogs(date: string, campus: any | null) {
    this.logsService.getActivityLogs(date, campus).subscribe({
      next: (response) => {
        this.logs = response;
        // ////console.log(this.logs);
        this.userLogsListArray$.subscribe(userList => {
          this.userArray = userList;
          // Assuming userList is an array of users and you want to find users matching log userId
          this.finalLogsArray = this.logs.map(log => {
            const user = this.userArray.find(user => user.userId === log.userId);
            return {
              ...log,
              userName: user ? user.name : 'Unknown'
            };
          });
        });
        // ////console.log("Final Logs User Mainte:",this.finalLogsArray)
      },
      error: (error) => {
        console.error(error);
      }
    });

   
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.currentDate = this.formatDate(event.value);
      const campus = sessionStorage.getItem('campus');
      let decryptedCampus: string | null = null;

      if (campus) {
        try {
          const bytes = CryptoJS.AES.decrypt(campus, 'chmsu.edu.ph.secret-key.secret');
          decryptedCampus = bytes.toString(CryptoJS.enc.Utf8);
          
          if (!decryptedCampus) {
            console.error('Decryption resulted in an empty value.');
          }
        } catch (error) {
          console.error('Error during decryption:', error);
        }
      } else {
        console.warn('No campus data found in sessionStorage.');
      }

      ////console.log('Decrypted Campus:', decryptedCampus);
      this.loadUserMaintenanceLogs(this.currentDate, decryptedCampus);
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getCurrentDateString(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
