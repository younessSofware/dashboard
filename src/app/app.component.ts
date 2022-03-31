import { SocketService } from './services/socket.service';
import { ModulesMessengerService } from './services/modules-messenger.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wabel-dashboard';
  constructor(private socketService: SocketService, private modulesMessengerService: ModulesMessengerService, private authService: AuthService){
    this.init();
  }

  ngOnInit(): void {
  }

  init(){
    this.socketService.connect();
    this.socketService.onNewMessageNotification().subscribe({
      next: sender => {
        this.modulesMessengerService.sendMessage({type: 'new-message', data: sender})
      }
    })
    this.socketService.onError().subscribe({
      next: (error: any) => {
        console.log("socket error", error);
        console.log("socket error", error.status);
        if(error.status && error.status == 401) this.authService.logout();
      }
    })
  }

}
