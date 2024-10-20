import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './dashboard-content/login/login.component';
import { DashboardComponent } from './dashboard-content/dashboard/dashboard.component';
import { ArchiveComponent } from './dashboard-content/archive/archive.component';
import { ReportsComponent } from './dashboard-content/reports/reports.component';
import { LogsComponent } from './dashboard-content/logs/logs.component';
import { NewDocumentComponent } from './dashboard-content/new-document/new-document.component';
import { EmailMultipleComponent } from './dashboard-content/new-document/email-multiple/email-multiple.component';
import { EmailGroupComponent } from './dashboard-content/new-document/email-group/email-group.component';
import { EmailIndividualComponent } from './dashboard-content/new-document/email-individual/email-individual.component';
import { InstitutionComponent } from './dashboard-content/institution/institution.component';
import { CallbackComponent } from './callback/callback/callback.component';
import { CustomGroupComponent } from './dashboard-content/custom-group/custom-group.component';
import { NotificationsComponent } from './dashboard-content/notifications/notifications.component';
import { authGuard } from './auth.guard';
import { authViewGuard } from './auth-view.guard';
import { ErrorComponent } from './error/error.component';
import { NotificationInformationComponent } from './dashboard-content/notification-information/notification-information.component';
import { DashboardInfoComponent } from './dashboard-content/dashboard-info/dashboard-info.component';
import { LogoutComponent } from './logout/logout.component';
import { loginAuthGuard } from './login-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginAuthGuard], // Use loginAuthGuard to control access
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
      { path: 'archives', component: ArchiveComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'new-document', component: NewDocumentComponent },
      { path: 'egroup', component: EmailGroupComponent },
      { path: 'individual', component: EmailIndividualComponent },
      { path: 'emultiple', component: EmailMultipleComponent },
      { path: 'institutions', component: InstitutionComponent },
      { path: 'customgroup', component: CustomGroupComponent },
      { path: 'notificationInformation',component:NotificationInformationComponent},
      { path: 'dashboard-info',component:DashboardInfoComponent}
    ]
  },
  {
    path: 'notifications/:documentId',
    component: NotificationsComponent,
    canActivate: [authViewGuard] // Independent guard for notifications
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  // Catch-all route to handle any unknown paths
  {
    path: '**',
    redirectTo: 'error', // Redirect unknown paths to ErrorComponent
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
