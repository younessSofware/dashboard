import { Account } from './../../../common/models/account';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  defaultAccount: any = null;
  partnerId: any = null;
  user: any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getQueryParams();
    this.user = localStorage.getItem('user');
  }

  getQueryParams(){
    this.route.queryParamMap.subscribe({
      next: params => {
        const id = params.get('id');
        const name = params.get('name');
        const role = params.get('role');

        if(id && name && role) this.defaultAccount = {id, name, role};
      }
    })
  }

  setPartnerId(account: Account | undefined){
    this.partnerId = account ? account.id : null;
  }

}
