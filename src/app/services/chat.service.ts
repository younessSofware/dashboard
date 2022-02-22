import { Observable } from 'rxjs';
import { Message } from './../common/models/Message';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    this.setToken();
  }

  setToken(){
    const token = localStorage.getItem('token');
    this.socket.ioSocket['auth'] = { token }
  }

  sendMessage(message: Message){
    console.log(message);
    this.setToken();
    this.socket.emit('send-message', message);
  }

  onNewMessage(): Observable<Message>{
    return this.socket.fromEvent('new-message')
  }

  onMessageSent(): Observable<Message>{
    return this.socket.fromEvent('message-sent')
  }
}
