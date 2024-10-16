import { Component } from '@angular/core';
import { DashboardInfoService } from './dashboard-info.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.css'],
})
export class DashboardInfoComponent {
  notifications: any[] = [];
  archives: any[] = [];
  secretKey = 'chmsu.edu.ph.secret-key.secret';
  rowCards = [
    { title: 'Total Notification', content: '' },
    { title: 'Total Documents', content: '' },
    { title: 'Currently Logged In User', content: '' },
  ];

  constructor(private dashboardInfoService: DashboardInfoService) {}

  ngOnInit() {
    this.dashboardInfoService.getAllNotifications().subscribe({
      next: (response: any) => {
        this.notifications = response;
        // Update the rowCards content dynamically
        this.rowCards[0].content = `${this.notifications.length} notifications available`;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      },
    });

    this.dashboardInfoService.getArchives().subscribe({
      next: (response: any) => {
        this.archives = response;
        this.rowCards[1].content = `${this.archives.length} documents available`;
      },
    });

    const currentUser = sessionStorage.getItem('name');
    const decryptedAccessLevel = decryptValue(currentUser, this.secretKey);
    this.rowCards[2].content = `${decryptedAccessLevel}`;
  }
}
function decryptValue(
  encryptedValue: string | null,
  secretKey: string
): string {
  if (encryptedValue) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return '';
}
