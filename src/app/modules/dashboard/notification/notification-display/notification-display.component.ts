import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notification-display',
  templateUrl: './notification-display.component.html',
  styleUrls: ['./notification-display.component.scss']
})
export class NotificationDisplayComponent implements OnInit {

  notificationId: number;
  notification: any;

  notificationError: string;


  constructor(private route: ActivatedRoute, private dataService: DataService, private translateService: TranslateService) { }

  async ngOnInit() {
    console.log("month before: ", this.monthBefore());
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
        if(id) this.notificationId = +id
        this.getNotification();
      }
    )
  }

  getNotification(){
    this.dataService.sendGetRequest('notifications' + '/' + this.notificationId, {})
    .subscribe({
      next: (resp: any) => {
        this.notification = resp;
      },
      error: err => {
        this.notificationError = err;
      }
    })
  }
}

