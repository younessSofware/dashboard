import { MessageType } from './../../../../common/models/enums/message-type';
import { MessageAccount } from './../../../../common/models/message-account';
import { AccountRole } from './../../../../common/models/enums/account-role';
import { Account } from './../../../../common/models/account';
import { DashboardService } from './../../../../services/dashboard.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { not } from '@angular/compiler/src/output/output_ast';

type usersRole = 'clients' | 'delivery men' | 'stores'

@Component({
  selector: 'app-correspondents-list',
  templateUrl: './correspondents-list.component.html',
  styleUrls: ['./correspondents-list.component.scss']
})
export class CorrespondentsListComponent implements OnInit, OnChanges {

  @Input() targetedAccount: Account;
  @Output() onAccountSelected = new EventEmitter();

  usersRole: AccountRole = AccountRole.STORE;
  loading = false;
  accounts: MessageAccount[] = [];
  error: string | null;
  clients: any[] = [];
  deliverMen: any[] = [];
  stores: any[] = [];
  selectedAccount: Account | null = null;
  tabs = [
    {
      title: 'Stores',
      role: 'store',
      notifications: 0
    },
    {
      title: 'Clients',
      role: 'client',
      notifications: 0
    },
    {
      title: 'Delivery men',
      role: 'delivery man',
      notifications: 0
    },
    {
      title: 'Admins',
      role: 'admin',
      notifications: 0
    }
  ]

  get targetedMessageAccount(): MessageAccount{
    return {
      account: this.targetedAccount,
      newMessages: 0,
      lastMessage: ''
    }
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['targetedAccount']){
        if(this.targetedAccount) this.setTargetedAccount()
        else if(!this.accounts.length) this.getCorrespondents()
      }
  }

  setTargetedAccount(){
    this.accounts = [this.targetedMessageAccount]
    this.usersRole = this.targetedAccount.role;
    this.selectedAccount = this.targetedAccount;
    this.onAccountSelected.emit(this.selectedAccount);
    this.getCorrespondents();
  }

  changeUsersRole(usersRole: string){
    this.usersRole = usersRole as AccountRole;
    this.accounts = [];
    this.selectedAccount = null;
    this.onAccountSelected.emit(null)
    this.getCorrespondents();
  }

  getCorrespondents(){
    this.loading = true;
    this.error = null;
    this.dashboardService.getCorrespondents(this.usersRole).subscribe({
      next: (resp: any) => {
        this.accounts = resp.data.filter((msgAcc: MessageAccount) => msgAcc.account.id != this.selectedAccount?.id)

        if(this.targetedAccount){
          const targetAccount = resp.data.find((msgAcc: MessageAccount) => msgAcc.account.id == this.targetedAccount.id);
          if(!targetAccount && this.usersRole == this.targetedAccount.role) this.accounts.unshift(this.targetedMessageAccount)
        }

        if(this.selectedAccount){
          const messageAccount = this.accounts.find(msgAccount => msgAccount.account.id == this.selectedAccount?.id)
          if(messageAccount) messageAccount.newMessages = 0;
        }
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.error = err;
        this.loading = false;
      }
    })
  }

  accountAvatar(){
    if(this.usersRole == 'store') return './../../../../assets/store.png';
    else if(this.usersRole == 'delivery man') return './../../../../assets/delivery-man.png'
    else return './../../../../assets/client.png'
  }

  isSelected(msgAccount: MessageAccount){
    return this.selectedAccount?.id == msgAccount.account.id
  }

  lastMessage(msgAccount: MessageAccount){
    const type = msgAccount.lastMessage.type;
    return type == MessageType.TEXT ? msgAccount.lastMessage.text : (type == MessageType.AUDIO ? 'audio' : 'photo')
  }

  select(msgAccount: MessageAccount){
    this.selectedAccount = msgAccount.account;
    msgAccount.newMessages = 0;
    this.onAccountSelected.emit(this.selectedAccount)
  }
}
