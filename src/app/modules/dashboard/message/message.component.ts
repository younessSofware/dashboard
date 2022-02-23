import { Account } from './../../../common/models/account';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageType } from './../../../common/models/enums/message-type';
import { ChatService } from './../../../services/chat.service';
import { Message } from './../../../common/models/Message';
import { MessageState } from './../../../common/models/enums/message-state';
import { DashboardService } from './../../../services/dashboard.service';
import { AccountRole } from './../../../common/models/enums/account-role';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  defaultAccount: any;
  partnerId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams(){
    this.route.queryParamMap.subscribe({
      next: params => {
        const id = params.get('id');
        const name = params.get('name');
        const role = params.get('role');

        this.defaultAccount = {id, name, role};
      }
    })
  }

  setPartnerId(account: Account){
    this.partnerId = account.id;
  }

}
