import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReceiverModalServiceService } from './receiver-modal-service.service';

@Component({
  selector: 'app-receiver-modal',
  templateUrl: './receiver-modal.component.html',
  styleUrls: ['./receiver-modal.component.css']
})
export class ReceiverModalComponent {
  notifications:any[]=[];
  matchingNotification: any | null = null;
constructor(@Inject(MAT_DIALOG_DATA)public data:any, private recieverModalService:ReceiverModalServiceService){}
ngOnInit(){
  console.log(this.data.alignedReceivers)
}
}
