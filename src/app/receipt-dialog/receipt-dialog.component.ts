import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.css']
})
export class ReceiptDialogComponent {
  supermartName = "SupMark";
  
  constructor(public dialogRef: MatDialogRef<ReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    print() {
      window.print();
    }
}