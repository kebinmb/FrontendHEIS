import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Clear session storage and cookies
    this.clearSessionAndCookies();

    // Extract the 'message' query parameter from the URL
    this.route.queryParamMap.subscribe(params => {
      this.errorMessage = params.get('message');
    });
  }

  // Function to clear all session storage and cookies
  clearSessionAndCookies(): void {
    // Clear session storage
    sessionStorage.clear();

    // Clear cookies by setting their expiration date to the past
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}
