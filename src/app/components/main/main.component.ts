import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
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
      const maxNum = Math.floor(Math.random() * (4949 - 4900) + 4900);

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
