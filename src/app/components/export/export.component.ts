import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ExportDialogComponent} from '../export-dialog/export-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  usersForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.usersForm = this.fb.group({
      users: this.fb.array([
        this.fb.group({
          creditCard: new FormControl(''),
          sum: new FormControl(0),
          name: new FormControl(''),
        }),
      ]),
    });
  }

  ngOnInit(): void {
    console.log(this.users);
  }

  get users(): Partial<FormArray> {
    return this.usersForm.get('users');
  }

  addNewUser(): void {
    this.users.push(
      this.fb.group({
        creditCard: new FormControl(''),
        sum: new FormControl(0),
        name: new FormControl(''),
      })
    );
  }

  AddMoreUsers(): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result > 0) {
      }
    });
  }
}
