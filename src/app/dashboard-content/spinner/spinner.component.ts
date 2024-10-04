import { Component, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnChanges {
  @Input() isLoading: boolean = false; // Input property to control spinner visibility

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.cdr.detectChanges(); // Ensure change detection when isLoading changes
    }
  }
}
