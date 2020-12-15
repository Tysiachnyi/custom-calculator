import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  value = 0;
  name = '';
  card = '';

  constructor() {}

  ngOnInit(): void {}
}
