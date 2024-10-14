import { ChangeDetectorRef, Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { ArchiveComponent } from '../archive/archive.component';
import { ReportsComponent } from '../reports/reports.component';
import { NewDocumentComponent } from '../new-document/new-document.component';
import { InstitutionComponent } from '../institution/institution.component';
import { LogsComponent } from '../logs/logs.component';
import { TokenService } from 'src/app/token.service';
import { CustomGroupComponent } from '../custom-group/custom-group.component';
import { NotificationInformationComponent } from '../notification-information/notification-information.component';
import { DashboardInfoComponent } from '../dashboard-info/dashboard-info.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  pageTitle:string = "Dashboard";
  admin:any;
  private secretKey:string = 'chmsu.edu.ph.secret-key.secret';
  constructor(private cdRef: ChangeDetectorRef, private dashboardService:DashboardService,private routes:Router, private snackBar: MatSnackBar,private tokenService:TokenService) {}
  onActivate(componentReference: any) {
    const componentTitles = {
      [ArchiveComponent.name]: 'Archives',
      [NewDocumentComponent.name]: 'New Document',
      [InstitutionComponent.name]: 'Institution',
      [ReportsComponent.name]:'Reports',
      [LogsComponent.name]:'System Logs',
      [CustomGroupComponent.name]:'Custom Group',
      [NotificationInformationComponent.name]:'Notifications',
      [DashboardInfoComponent.name]:'Dashboard'
      // [CredentialsComponent.name]:'Credentials',
      // [LoginComponent.name]:'Login'
    };

    const componentName = componentReference.constructor.name;
    if (componentTitles[componentName]) {
      this.pageTitle = componentTitles[componentName];
      this.cdRef.detectChanges(); // Ensure the view updates
    }
  }
  // ngOnInit(){
  //   this.dashboardService.getAdminDetails().subscribe({
  //     next:((response:any)=>{
  //       this.admin = response;
  //       const encryptedUsername = CryptoJS.AES.encrypt(this.admin.username.toString(), this.secretKey).toString();
  //       const encryptedAccessLevel = CryptoJS.AES.encrypt(this.admin.accessLevel.toString(), this.secretKey).toString();
  //       const encryptedCampus = CryptoJS.AES.encrypt(this.admin.campus.toString(), this.secretKey).toString();
  //       const encryptedName = CryptoJS.AES.encrypt(this.admin.name.toString(), this.secretKey).toString();
  //       sessionStorage.setItem("username", encryptedUsername);
  //       sessionStorage.setItem("access_level", encryptedAccessLevel);
  //       sessionStorage.setItem("campus", encryptedCampus);
  //       sessionStorage.setItem("name", encryptedName);
  //       // this.snackBar.open("Login Successful", "Close", {
  //       //   duration: 3000, // Duration in milliseconds
  //       //   horizontalPosition: 'right',
  //       //   verticalPosition: 'top'
  //       // });
  //     }),error:(error:any)=>{
  //       this.snackBar.open("Login Failed", "Close", {
  //         duration: 3000, // Duration in milliseconds
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top'
  //       });
  //     }
  //   })
  //   this.tokenService.getToken().subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //     }
  //   });
  // }
  
}
