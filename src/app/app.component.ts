import { SocketService } from './services/socket.service';
import { ModulesMessengerService } from './services/modules-messenger.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wabel-dashboard';
  constructor(private socketService: SocketService, private modulesMessengerService: ModulesMessengerService){
    socketService.connect();
    AuthService.logoutOnTokenExpired();
    this.socketService.onNewMessageNotification().subscribe({
      next: sender => {
        console.log("-----------------------");
        console.log("new message-not from app", sender);
        modulesMessengerService.sendMessage({type: 'new-message', data: sender})
      }
    })
  }
}
