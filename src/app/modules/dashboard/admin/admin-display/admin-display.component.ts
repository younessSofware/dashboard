import { ActivatedRoute } from '@angular/router';
import { DOMAIN_URL } from './../../../../common/constants';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Button } from 'src/app/common/models/button';
import { Header } from 'src/app/common/models/header';

@Component({
  selector: 'app-admin-display',
  templateUrl: './admin-display.component.html',
  styleUrls: ['./admin-display.component.scss']
})
export class AdminDisplayComponent implements OnInit {

  userId: number;
  user: any;

  loadingEvents: boolean;

  profileError: string;




  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  async ngOnInit() {
    this.getDataId();
  }


  monthBefore () {
    const date = new Date()
    return [...new Array(31).keys()].map((e, ind) => {
      if(ind) date.setDate(date.getDate() - 1)
      return date.getDate() + ' ' + date.toString().slice(4, 7)
    }).reverse()
  }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.userId = +id;
      }
    );
    this.getUser();
  }


  getUser(){
    const url = this.userId ? 'admins/' + this.userId: 'profile';
    this.dataService.sendGetRequest(url, {})
    .subscribe({
      next: (resp: any) => {
        this.user = resp;

      },
      error: err => {
        this.profileError = err;
      }
    })
  }






  enable(){
    console.log(67);

    this.dataService.sendPutRequest('users/enable/' + this.userId, {}).subscribe({
      next: (resp: any) => {
        if(this.user.active == 0) this.user.active = 1;
        else if(this.user.active == 1) this.user.active = 0;
      },
      error: err => {
        console.log(err);
      }
    })
  }


}
