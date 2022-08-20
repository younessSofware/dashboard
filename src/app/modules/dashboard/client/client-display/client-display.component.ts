import { ActivatedRoute } from '@angular/router';
import { DOMAIN_URL } from './../../../../common/constants';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Button } from 'src/app/common/models/button';
import { Header } from 'src/app/common/models/header';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

  userId: number;
  user: any;

  loadingEvents: boolean;

  profileError: string;

  headers: Header[] = [
    {
      name: "id",
      title: "id",
      hidden: true,
      value: ''
    },
    {
      name: "name",
      title: "name",
      search: true
    },    {
      name: "type",
      title: "type",
    },
    {
      name: "date_from",
      title: "date_from",
    },
    {
      name: "date_to",
      title: "date_to",
    },
    {
      name: "created_at",
      title: "created_at",
      type: "date"
    },
  ];

  tableButtons: Button[] = [

  ];

  buttons: Button[] = [];


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
        this.initTableButtons();
      }
    );
    this.getUser();
  }
  initTableButtons(){
    const id = this.user ? this.user.id : this.userId ;
    console.log(this.user);

    this.tableButtons = [
      {
        name: 'block',
        title: 'block',
        icon: 'fas fa-ban',
        color: 'blue',
        dataField: 'events.id',
        request: {
          url: 'events/users/' + id,
          method: 'delete',
        },
        confirmation: {
          title: 'are_you_sure',
          text: 'block_event_conf_msg',
          confirmButtonText: 'yes',
          confirmButtonColor: 'red',
          showCancelButton: true,
          cancelButtonText: 'no',
          icon: 'warning'
        }
      }
    ];
  }

  getUser(){
    const url = this.userId ? 'users/' + this.userId: 'profile';
    this.dataService.sendGetRequest(url, {})
    .subscribe({
      next: (resp: any) => {
        this.user = resp;
        this.initTableButtons();

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
