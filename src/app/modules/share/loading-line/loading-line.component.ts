import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-line',
  templateUrl: './loading-line.component.html',
  styleUrls: ['./loading-line.component.scss']
})
export class LoadingLineComponent implements OnInit {

  @Input() loading = true;

  constructor() { }

  ngOnInit(): void {
  }

}
