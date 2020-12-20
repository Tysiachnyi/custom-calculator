import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss'],
})
export class ExportDialogComponent {
  countOfUsers: number;

  constructor(public dialogRef: MatDialogRef<ExportDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
