import { Component, OnInit } from '@angular/core';
import { DashboardInfoService } from './dashboard-info.service';
import * as CryptoJS from 'crypto-js';

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
  latestArchives:any[]=[];
  secretKey = 'chmsu.edu.ph.secret-key.secret';

  rowCards = [
    { title: 'Total Notification', content: '' },
    { title: 'Total Documents', content: '' },
    { title: 'Currently Logged In User', content: '' },
  ];

  displayedColumns: string[] = ['documentId', 'receiver', 'timestamp'];
  displayedColumnsArchives: string[] = ['documentNumber', 'subject', 'timestamp']; // Define columns for the table

  constructor(private dashboardInfoService: DashboardInfoService) {}

  ngOnInit() {
    this.loadUserList(); // Load user list first to ensure receiver mapping works
    this.loadNotifications();
    this.loadArchives();
    this.setCurrentUser();
  }

  /** Fetch notifications from the service */
  loadNotifications() {
    this.dashboardInfoService.getAllNotifications().subscribe({
      next: (response: any) => {
        this.notifications = response || [];
        console.log('Notifications:', this.notifications);

        // Update row card content with the total notifications count
        this.rowCards[0].content = `${this.notifications.length} notifications`;

        // Get the latest 10 notifications after loading
        this.getLatestNotifications();
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      },
    });
  }

  /** Fetch archives from the service */
  loadArchives() {
    this.dashboardInfoService.getArchives().subscribe({
      next: (response: any) => {
        this.archives = response || [];
        console.log('All Archives:', this.archives);

        // Update row card content with the total number of documents
        this.rowCards[1].content = `${this.archives.length} documents`;

        // Store the latest archives after fetching
        this.getLatestArchives();
      },
      error: (error) => {
        console.error('Error fetching archives:', error);
      },
    });
  }

  /** Set the current user by decrypting the value from sessionStorage */
  setCurrentUser() {
    const encryptedUser = sessionStorage.getItem('name');
    const decryptedUser = decryptValue(encryptedUser, this.secretKey);
    this.rowCards[2].content = decryptedUser || 'No user found';
  }

  /** Fetch user list from the service */
  loadUserList() {
    this.dashboardInfoService.getUserList().subscribe({
      next: (response: any) => {
        this.userList = response || [];
        console.log('User List:', this.userList);
      },
      error: (error) => {
        console.error('Error fetching user list:', error);
      },
    });
  }

  /** Get the 10 latest notifications by sorting and slicing */
  getLatestNotifications() {
    this.latestNotifications = this.notifications
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
      .map(notification => {
        const user = this.userList.find(u => u.userId === notification.receiver);
        return {
          ...notification,
          receiverName: user ? user.name : 'Unknown User',
        };
      });

    console.log('Latest Notifications with Receiver Names:', this.latestNotifications);
  }

  getLatestArchives() {
    this.latestArchives = this.archives
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort by timestamp descending
      .slice(0, 10); // Keep only the latest 10 archives

    console.log('Latest Archives:', this.latestArchives);
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
