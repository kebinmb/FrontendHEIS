import { Component } from '@angular/core';
import { HttpService } from 'src/app/OAuthHttpServices/http.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  url: string = "";
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get("/auth/url").subscribe({
      next: (data: any) => {
        this.url = data.authUrl;
        console.log(data);
      },
      error: (err:any) => {
        console.error(err);
      }
    });
  }
  
}
