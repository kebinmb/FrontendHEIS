import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogoutService } from './logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService:AuthService,private snackBar:MatSnackBar,private logoutService:LogoutService){}
  ngOnInit(): void {
    this.logoutService.logout(); // Trigger logout on component initialization
  }
 
}
