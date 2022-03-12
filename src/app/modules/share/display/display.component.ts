import { Chart } from './../../../common/models/Chart';
import { Component, Input, OnInit } from '@angular/core';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';

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
  @Input() profileTitle = "account";

  @Input() charts: Chart[]
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
