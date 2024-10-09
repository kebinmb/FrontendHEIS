import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage:string;

  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
    // Check for error in the query parameters
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        this.errorMessage = 'An error occurred. Please try again later.';
        
        // Optionally, you can display the actual error message from the server if provided
        if (params['message']) {
          this.errorMessage += ` Reason: ${params['message']}`;
        }
      }
    });
  }
}
