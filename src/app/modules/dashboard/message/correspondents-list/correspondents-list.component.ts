import { AccountRole } from './../../../../common/models/enums/account-role';
import { Account } from './../../../../common/models/account';
import { DashboardService } from './../../../../services/dashboard.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

type Section = 'clients' | 'delivery men' | 'stores'

@Component({
  selector: 'app-correspondents-list',
  templateUrl: './correspondents-list.component.html',
  styleUrls: ['./correspondents-list.component.scss']
})
export class CorrespondentsListComponent implements OnInit, OnChanges {


  @Input() defaultAccount: Account;
  @Output() onAccountSelected = new EventEmitter();

  section: Section = 'stores';
  loading = false;
  error: string | null;
  clients: any[] = [];
  deliverMen: any[] = [];
  stores: any[] = [];
  selectedAccount: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCorrespondents();
    if(this.defaultAccount) this.setDefaultAccount();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['defaultAccount'] && this.defaultAccount){
        this.setDefaultAccount()
      }
  }

  setDefaultAccount(){
    switch(this.defaultAccount.role){
      case AccountRole.CLIENT:
        this.addAccountToList(this.defaultAccount, this.clients)
        break;

      case AccountRole.STORE:
        this.addAccountToList(this.defaultAccount, this.stores)
        break;

      case AccountRole.DELIVERY_MAN:
        this.addAccountToList(this.defaultAccount, this.deliverMen)
        break;
    }
    this.selectedAccount = this.defaultAccount.id;
    this.onAccountSelected.emit(this.defaultAccount);
  }

  addAccountToList(account:Account, accounts: Account[]){
    if(!accounts.find(acc => acc.id == account.id)) accounts.push(account)
  }

  changeSection(section: Section){
    this.section = section
    this.getCorrespondents();
  }

  getCorrespondents(){
    this.loading = true;
    this.error = null;
    console.log("correspondents");
    this.dashboardService.getCorrespondents().subscribe({
      next: resp => {
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.error = err;
        this.loading = false;
      }
    })
  }

  accounts(){
    return this.section == 'clients' ? this.clients : (this.section == 'delivery men' ? this.deliverMen : this.stores)
  }

  accountAvatar(){
    return './../../../../assets/store.png'
  }
}
