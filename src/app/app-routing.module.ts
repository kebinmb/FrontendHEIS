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

export const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      { path:'archives',component:ArchiveComponent},
      { path:'reports',component:ReportsComponent},
      { path: 'logs', component: LogsComponent,},
      { path: 'new-document', component: NewDocumentComponent },
      { path: 'egroup', component: EmailGroupComponent},
      { path: 'eindvidual', component: EmailIndividualComponent},
      { path: 'emultiple', component: EmailMultipleComponent},
      { path: 'institutions', component: InstitutionComponent},
      { path: 'customgroup', component:CustomGroupComponent},
      { path: 'notifications', component:NotificationsComponent}
    ]
  }
];
// export const routes: Routes = [
//   { path: 'callback', component: CallbackComponent },
//   { path: 'login', redirectTo: 'callback', pathMatch: 'full' }, // Redirect to login
//   { path: '', component: LoginComponent }, // Your main component
//   { path:'archives',component:ArchiveComponent}
//   // Other routes...
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
