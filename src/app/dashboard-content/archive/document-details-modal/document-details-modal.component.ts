import { Component, Inject, OnInit } from '@angular/core';
import { DocumentModalService } from './document-modal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-document-details-modal',
  templateUrl: './document-details-modal.component.html',
  styleUrls: ['./document-details-modal.component.css']
})
export class DocumentDetailsModalComponent {
  imageUrls: string[] = [];
  userNames: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DocumentDetailsModalComponent>,
    private modalService: DocumentModalService
  ) {}

  ngOnInit(): void {
   
    ////console.log(this.data.attention);
    if (this.data.attachment) {
      const filenames = this.modalService.parseFilenames(this.data.attachment);
      this.imageUrls = this.modalService.generateUrls(filenames);
    }
  }

  getLetterType(type: number): string {
    switch (type) {
      case 1: return 'Memo';
      case 2: return 'Letter';
      case 3: return 'Special Orders';
      case 4: return "President's Memo";
      case 5: return 'Other Memos';
      default: return 'Unknown';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
  
  
}

