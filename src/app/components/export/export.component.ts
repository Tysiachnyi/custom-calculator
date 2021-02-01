import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ExportDialogComponent} from '../export-dialog/export-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  usersForm: FormGroup;
  currentName = '';
  globalCount = 0;
  randomValue = 4950;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
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

  ngOnInit(): void {}

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

        for (let i = 1; i <= result; i++) {
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
    if (data.length !== 0) {
      const newValue = data.reduce(
        (res, user) => [
          ...res,
          ...this.convertSum(user.sum).map((payout, index) => ({
            creditCard: user.creditCard.trim().replace(/\s/g, ''),
            payout: +payout.toFixed(2),
            name: index === 0 ? user.name : '',
            payoutData: `${user.creditCard.replace(/\s/g, '')};${(
              payout * 100
            ).toFixed(0)}`,
            total: index === 0 ? user.sum : '',
          })),
        ],
        []
      );

      const binaryWS = XLSX.utils.json_to_sheet(newValue);

      const wb = XLSX.utils.book_new();

      // Name your sheet
      XLSX.utils.book_append_sheet(wb, binaryWS, 'Payout Data');

      // export your excel
      XLSX.writeFile(wb, 'PayoutData.xlsx');
    } else {
      this.snackBar.open(`You cant export empty list `, 'Close', {
        duration: 1500,
      });
    }
  }

  convertSum(value: number): number[] {
    const result = [];

    while (value > 0) {
      const rand = Math.floor(Math.random() * (4990 - 4950) + 4950);
      const nextNumber = value < rand ? value : rand;

      result.push(nextNumber);

      value -= nextNumber;
    }

    return result;
  }
}
