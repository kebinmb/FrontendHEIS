import { Component, OnInit } from '@angular/core';
import { DashboardInfoService } from './dashboard-info.service';
import * as CryptoJS from 'crypto-js';
import { HttpService } from 'src/app/OAuthHttpServices/http.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.css'],
})
export class DashboardInfoComponent implements OnInit {
  notifications: any[] = [];
  archives: any[] = [];
  latestNotifications: any[] = [];
  userList: any[] = [];
  latestArchives: any[] = [];
  secretKey = 'chmsu.edu.ph.secret-key.secret';
  totalDocuments: any[] = [];
  currentYear = new Date().getFullYear();
  rowCards = [
    { title: 'Total Notification', content: '' },
    { title: `Total Documents for ${this.currentYear}`, content: '' },
    { title: 'Currently Logged In User', content: '' },
  ];

  displayedColumns: string[] = ['documentId', 'receiver', 'timestamp'];
  displayedColumnsArchives: string[] = ['documentNumber', 'subject', 'timestamp'];

  constructor(private dashboardInfoService: DashboardInfoService, private http: HttpService) {}

  ngOnInit() {
    this.setCurrentUser(); // Synchronous, so no need to parallelize
    this.loadDataInParallel();
  }

  /** Load all necessary data in parallel */
  loadDataInParallel() {
    forkJoin({
      notifications: this.dashboardInfoService.getAllNotifications(),
      // archives: this.dashboardInfoService.getArchives(),
      // userList: this.dashboardInfoService.getUserList(),
      totalDocuments: this.dashboardInfoService.getTotalDocumentCount(),
      latestNotifications: this.dashboardInfoService.getRecentNotifications(),
      latestArchives: this.dashboardInfoService.getRecentDocuments(),
    }).subscribe({
      next: (response) => {
        this.notifications = response.notifications || [];
        // this.archives = response.archives || [];
        // this.userList = response.userList || [];
        this.totalDocuments = response.totalDocuments;
        this.latestNotifications = response.latestNotifications || [];
        this.latestArchives = response.latestArchives || [];

        console.log('Parallel Data Loaded:', response);

        // Update the row cards with the fetched data
        this.rowCards[0].content = `${this.notifications.length} notifications`;
        this.rowCards[1].content = `${this.totalDocuments} documents`;
      },
      error: (error) => {
        console.error('Error loading data in parallel:', error);
      },
    });
  }

  /** Sets the currently logged-in user */
  setCurrentUser() {
    const encryptedUser = sessionStorage.getItem('name');
    const decryptedUser = decryptValue(encryptedUser, this.secretKey);
    this.rowCards[2].content = decryptedUser || 'No user found';
  }
}

/** Decrypts the encrypted value using the secret key */
function decryptValue(encryptedValue: string | null, secretKey: string): string {
  if (encryptedValue) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return '';
}
