import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { DashboardComponent } from './dashboard-content/dashboard/dashboard.component';
import { ArchiveComponent } from './dashboard-content/archive/archive.component';
import { DocumentDetailsModalComponent } from './dashboard-content/archive/document-details-modal/document-details-modal.component';
import { SpinnerComponent } from './dashboard-content/spinner/spinner.component';
import { NgxPrintModule } from 'ngx-print';
import { LoginComponent } from './dashboard-content/login/login.component';
import { ReportsComponent } from './dashboard-content/reports/reports.component';
import { dailyReportReducer, userListReducer } from './dashboard-content/reports/daily-reports-state-manager/daily-report.reducer';
import { DailyReportEffects } from './dashboard-content/reports/daily-reports-state-manager/daily-reports.effects';
import { DepartmentEffects } from './dashboard-content/reports/department-list-state-manager/department-list.effects';
import { departmentReducer } from './dashboard-content/reports/department-list-state-manager/department-list.reducer';
import { DepartmentNamesEffect } from './dashboard-content/reports/department-state-manager/departmentname.effects';
import { departmentNamesReducer } from './dashboard-content/reports/department-state-manager/departmentname.reducer';
import { DepartmentUserNameEffects } from './dashboard-content/reports/external-report-department-username-state-manager/external-report-department-username.effects';
import { departmentUserNamesReducer } from './dashboard-content/reports/external-report-department-username-state-manager/external-report-department-username.reducer';
import { ExternalReportsEffects } from './dashboard-content/reports/external-reports-state-manager/external-report.effects';
import { externalReportReducer } from './dashboard-content/reports/external-reports-state-manager/external-report.reducer';
import { MonthlyReportsEffects } from './dashboard-content/reports/monthly-reports-state-manager/monthly-reports.effects';
import { monthlyReportsReducer } from './dashboard-content/reports/monthly-reports-state-manager/monthly-reports.reducer';
import { UserEffects } from './dashboard-content/reports/user-list-state-manager/userlist.effects';
import { UserNamesEffects } from './dashboard-content/reports/user-name-state-manager/userName.effects';
import { userNamesReducer } from './dashboard-content/reports/user-name-state-manager/userName.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeaderPrintComponent } from './dashboard-content/reports/header-print/header-print.component';
import { LogsComponent } from './dashboard-content/logs/logs.component';
import { userLogsReducer } from './dashboard-content/logs/logs-user-state-manager/logs-user.reducer';
import { UserLogsEffects } from './dashboard-content/logs/logs-user-state-manager/logs-user.effects';
import { LogsDocumentComponent } from './dashboard-content/logs/logs-document/logs-document.component';
import { UserMaintenanceLogsComponent } from './dashboard-content/logs/user-maintenance-logs/user-maintenance-logs.component';
import { CredentialsLogsComponent } from './dashboard-content/logs/credentials-logs/credentials-logs.component';
import { ActivitylogsComponent } from './dashboard-content/logs/activitylogs/activitylogs.component';
import { NewDocumentComponent } from './dashboard-content/new-document/new-document.component';
import { EmailIndividualComponent } from './dashboard-content/new-document/email-individual/email-individual.component';
import { EmailGroupComponent } from './dashboard-content/new-document/email-group/email-group.component';
import { EmailMultipleComponent } from './dashboard-content/new-document/email-multiple/email-multiple.component';
import { InstitutionComponent } from './dashboard-content/institution/institution.component';
import { InstitutionEffects } from './dashboard-content/institution/department-list-state-manager/department-list.effects';
import { institutionReducer } from './dashboard-content/institution/department-list-state-manager/department-list.reducer';
import { UserInstitutionEffects } from './dashboard-content/institution/user-institution-list-state-manager/institution-users.effects';
import { userInstitutionReducer } from './dashboard-content/institution/user-institution-list-state-manager/institution-users.reducer';
import { EditInstitutionModalComponent } from './dashboard-content/institution/edit-institution-modal/edit-institution-modal.component';
import { InstitutionModalComponent } from './dashboard-content/institution/institution-modal/institution-modal.component';
import { ConfirmdialogComponent } from './dashboard-content/institution/confirmdialog/confirmdialog.component';
import { RecipientsComponent } from './dashboard-content/institution/recipients/recipients.component';
import { RecipientModalComponent } from './dashboard-content/institution/recipient-modal/recipient-modal.component';
import { EditRecipientsModalComponent } from './dashboard-content/institution/edit-recipients-modal/edit-recipients-modal.component';
import { CallbackComponent } from './callback/callback/callback.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CustomGroupComponent } from './dashboard-content/custom-group/custom-group.component';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationsComponent } from './dashboard-content/notifications/notifications.component';
import { ErrorComponent } from './error/error.component';
import { NotificationInformationComponent } from './dashboard-content/notification-information/notification-information.component';
import { DatePipe } from '@angular/common';
import { ReceiverModalComponent } from './dashboard-content/notification-information/receiver-modal/receiver-modal.component';
import { DashboardInfoComponent } from './dashboard-content/dashboard-info/dashboard-info.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { LogoutComponent } from './logout/logout.component';
import { CustomGroupModalComponent } from './dashboard-content/custom-group/custom-group-modal/custom-group-modal.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { ProtectedContentComponent } from './Components/protected-content/protected-content.component';
import { WelcomeContentComponent } from './Components/welcome-content/welcome-content.component';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Import MatCheckboxModule
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    ArchiveComponent,
    DocumentDetailsModalComponent,
    SpinnerComponent,
    LoginComponent,
    ReportsComponent,
    HeaderPrintComponent,
    LogsComponent,
    LogsDocumentComponent,
    UserMaintenanceLogsComponent,
    CredentialsLogsComponent,
    ActivitylogsComponent,
    NewDocumentComponent,
    EmailIndividualComponent,
    EmailGroupComponent,
    EmailMultipleComponent,
    InstitutionComponent,
    EditInstitutionModalComponent,
    InstitutionModalComponent,
    ConfirmdialogComponent,
    RecipientsComponent,
    RecipientModalComponent,
    EditRecipientsModalComponent,
    CallbackComponent,
    CustomGroupComponent,
    NotificationsComponent,
    ErrorComponent,
    NotificationInformationComponent,
    ReceiverModalComponent,
    DashboardInfoComponent,
    LogoutComponent,
    CustomGroupModalComponent,
    LoginComponentComponent,
    ProtectedContentComponent,
    WelcomeContentComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      dailyReport: dailyReportReducer,
      userList: userListReducer,
      userNames: userNamesReducer,
      monthlyReports: monthlyReportsReducer,
      externalReports: externalReportReducer,
      departmentUserNames: departmentUserNamesReducer,
      departmentList: departmentReducer,
      departmentNames: departmentNamesReducer,
      userLogs:userLogsReducer,
      institution: institutionReducer,
      userInstitution: userInstitutionReducer,
  }),
  EffectsModule.forRoot([
      DailyReportEffects, UserEffects, UserNamesEffects, MonthlyReportsEffects, DepartmentEffects, DepartmentNamesEffect, ExternalReportsEffects, DepartmentUserNameEffects,UserLogsEffects,InstitutionEffects, UserInstitutionEffects
  ]),
    MatDialogModule,
    RouterModule.forRoot(routes),
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxPrintModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatOptionModule,
    MatMenuModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
