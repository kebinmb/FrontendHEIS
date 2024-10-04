import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-print',
  templateUrl: './header-print.component.html',
  styleUrls: ['./header-print.component.css']
})
export class HeaderPrintComponent {
  @Input() title: string ="DAILY REPORTS";
}
