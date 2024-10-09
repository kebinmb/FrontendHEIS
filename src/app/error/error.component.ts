import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string | null = null;

  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
    // Extract the 'message' query parameter from the URL
    this.route.queryParamMap.subscribe(params => {
      this.errorMessage = params.get('message');
    });
  }
}
