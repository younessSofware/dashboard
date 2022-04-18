import { Router } from '@angular/router';
import { ModulesMessengerService } from './../../../services/modules-messenger.service';
import { NotificationState } from './../../../common/models/enums/notification-state';
import { NotificationService } from './../../../services/notification.service';
import { StoreService } from './../../../services/store.service';
import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NotificationType } from 'src/app/common/models/enums/notification-type';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Output() hideNotifications = new EventEmitter();
  notifications: any[] = [];
  store: any;
  loading = false;

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(){
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (resp: any) =>{
        this.notifications = resp.data.notifications
        console.log("notification resp", resp);
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  // markNotificationAsSeen(){
  //   this.notificationService.markAsSeen(this.selectedNotification.id).subscribe({
  //     next: (resp: any) => {
  //       if(this.selectedNotification.state == NotificationState.SENT)
  //         this.messengerService.sendMessage({type: 'update-notification', data: -1})

  //       this.selectedNotification.state = NotificationState.SEEN;
  //       console.log(resp);
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   })
  // }


  allowToShowDate(ind: number){
    if(ind == 0) return true;

    const messageDate = new Date(this.notifications[ind].notification.createdAt as any as string);
    const lastMessageDate = new Date(this.notifications[ind - 1].notification.createdAt as any as string);

    return messageDate.getFullYear() != lastMessageDate.getFullYear() ||
           messageDate.getMonth() != lastMessageDate.getMonth() ||
           messageDate.getDate() != lastMessageDate.getDate();
  }

  navigate(url: string){
    this.hideNotifications.emit();
    this.router.navigateByUrl(url);
  }
}
