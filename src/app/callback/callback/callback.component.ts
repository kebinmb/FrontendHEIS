import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      this.authService.handleAuthCallback(code); // Handle the callback and get tokens
    }
  }
}
