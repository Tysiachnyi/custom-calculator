import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ExportDialogComponent} from '../export-dialog/export-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {saveAs} from 'file-saver';

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

  addMoreUsers(): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result > 0) {
        console.log(result);

        for (let i = 0; i <= result; i++) {
          this.users.push(
            this.fb.group({
              creditCard: new FormControl(''),
              sum: new FormControl(0),
              name: new FormControl(''),
            })
          );
        }
      }
    });
  }

  exportToCsv(data: any): void {
    const newValue = data.map(item => {
      return {
        ...item,
        allPayload: this.convertSum(item.sum),
      };
    });
    console.log(newValue);

    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(newValue[0]);
    const csv = data.map(row =>
      header
        .map(fieldName => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv'});
    saveAs(blob, 'myFile.csv');
  }

  convertSum(value: number): any {
    const maxNum = 4950;

    const allData = Array.from(
      {length: Math.floor(value / maxNum)},
      () => maxNum
    );
    const leftSide = value % maxNum;

    if (leftSide !== 0) {
      allData.push(leftSide);
    }
    const result = allData.toString().split(',').join(', ');
    return result;
  }
}
