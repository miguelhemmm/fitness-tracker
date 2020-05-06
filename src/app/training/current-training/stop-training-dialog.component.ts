import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `
  <h1 mat-dialog-title>Do you want to stop?</h1>
    <mat-dialog-content>
      <p>Your already got {{ passedData.progress }}%, do you want to proceed?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true" color="primary">Yes</button>
      <button mat-raised-button [mat-dialog-close]="false" color="warning">No</button>
    </mat-dialog-actions> `

})
export class StopTrainingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

}
