import { ModulesMessengerService } from './../../../services/modules-messenger.service';
import { NotificationState } from './../../../common/models/enums/notification-state';
import { NotificationService } from './../../../services/notification.service';
import { StoreService } from './../../../services/store.service';
import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/common/models/enums/notification-type';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  selectedNotification: any;
  notifications: any[] = [];
  store: any;
  loading = false;

  constructor(private notificationService: NotificationService, private storeService: StoreService, private messengerService: ModulesMessengerService) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  selectNotification(not: any){
    this.selectedNotification = not
    this.markNotificationAsSeen()
    if(not.notification.type == NotificationType.NEW_STORE){
      this.loading = true;
      this.getStore();
    }
  }

  getNotifications(){
    this.notificationService.getNotifications().subscribe({
      next: (resp: any) =>{
        this.notifications = resp.data
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getStore(){
    this.storeService.store(this.selectedNotification.notification.reference).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.store = resp.data
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  markNotificationAsSeen(){
    this.notificationService.markAsSeen(this.selectedNotification.id).subscribe({
      next: (resp: any) => {
        if(this.selectedNotification.state == NotificationState.SENT)
          this.messengerService.sendMessage({type: 'update-notification', data: -1})

        this.selectedNotification.state = NotificationState.SEEN;
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  accept(){
    this.notificationService.accept(this.selectedNotification.id).subscribe({
      next: (resp: any) => {
        this.selectedNotification.state = NotificationState.ACCEPTED
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  reject(){
    this.notificationService.reject(this.selectedNotification.id).subscribe({
      next: (resp: any) => {
        this.selectedNotification.state = NotificationState.REJECTED
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  allowToShowDate(ind: number){
    if(ind == 0) return true;

    const messageDate = new Date(this.notifications[ind].notification.createdAt as any as string);
    const lastMessageDate = new Date(this.notifications[ind - 1].notification.createdAt as any as string);

    return messageDate.getFullYear() != lastMessageDate.getFullYear() ||
           messageDate.getMonth() != lastMessageDate.getMonth() ||
           messageDate.getDate() != lastMessageDate.getDate();
  }


}
