import { Component } from '@angular/core';
import { HttpService } from 'src/app/OAuthHttpServices/http.service';

@Component({
  selector: 'app-protected-content',
  templateUrl: './protected-content.component.html',
  styleUrls: ['./protected-content.component.css']
})
export class ProtectedContentComponent {
  content: string = "";

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.getPrivate("/messages").subscribe((data: any) => this.content = data.message);
  }
}
