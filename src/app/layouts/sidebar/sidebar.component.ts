import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
adminDetails:any;
isLoaded:boolean=false;
userDetails:any;
constructor(private sidebarService:SidebarService,private snackBar:MatSnackBar){}
ngOnInit(){
  this.sidebarService.getGoogleUserDetails().subscribe({
    next:(adminDetails)=>{
      this.adminDetails = adminDetails;
      this.isLoaded = true;
    },error:(err=>{
      this.snackBar.open("Error fetching user info","Close",{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top'
      });
      console.error(err);
    })
  });
}
}
