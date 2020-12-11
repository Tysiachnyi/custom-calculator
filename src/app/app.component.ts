import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'custom-calculator';
  value = 0;
  result = 'The result will be displayed here 🚀 🚀 🚀';

  constructor(private snackBar: MatSnackBar) {}

  calculate(value: number): void {
    console.log(value);
    if (value === 0 || !value) {
      this.snackBar.open(`Value cannot be calculated`, 'Close', {
        duration: 3000,
      });
    } else {
      const maxNum = 4950;

      const allData = Array.from(
        {length: Math.floor(value / maxNum)},
        () => maxNum
      );
      const leftSide = value % maxNum;

      if (leftSide !== 0) {
        allData.push(leftSide);
      }
      this.result = allData.toString().split(',').join(', ');
      this.snackBar.open(`${value} successfully calculated`, 'Close', {
        duration: 3000,
      });
    }
  }
}
