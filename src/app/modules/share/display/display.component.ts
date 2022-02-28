import { Chart } from './../../../common/models/Chart';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  @Input() title: string
  @Input() profileError: string
  @Input() profile: {
    name: string,
    email: string,
    address: string,
    phoneNumber: string
  };
  @Input() charts: Chart[]

  constructor() { }

  ngOnInit(): void {
  }

}
