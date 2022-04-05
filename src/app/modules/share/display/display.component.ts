import { AccountState } from 'src/app/common/models/enums/account-state';
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
    address: any,
    phoneNumber: string,
    createdAt: string,
    state: AccountState
  };
  @Input() profileTitle = "account";

  @Input() charts: Chart[]
  @Input() icon: string;
  @Input() showDefaultProfileInfo = true;

  constructor() { }

  ngOnInit(): void {
  }

}
