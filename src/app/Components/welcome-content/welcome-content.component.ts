import { Component } from '@angular/core';
import { HttpService } from 'src/app/OAuthHttpServices/http.service';

@Component({
  selector: 'app-welcome-content',
  templateUrl: './welcome-content.component.html',
  styleUrls: ['./welcome-content.component.css']
})
export class WelcomeContentComponent {
  content: string = "";

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.get("/public/messages").subscribe((data: any) => this.content = data.message);
  }

}
