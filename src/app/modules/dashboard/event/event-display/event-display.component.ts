import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.scss']
})
export class EventDisplayComponent implements OnInit {

  eventId: number;
  event: any;

  eventError: string;


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
        if(id) this.eventId = +id
        this.getEvent();
      }
    )
  }

  getEvent(){
    this.dataService.sendGetRequest('events' + '/' + this.eventId, {})
    .subscribe({
      next: (resp: any) => {
        this.event = resp;
      },
      error: err => {
        this.eventError = err;
      }
    })
  }
}
