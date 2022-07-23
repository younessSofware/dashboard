import { Observable } from 'rxjs';
import { Message } from './../common/models/Message';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    socket.connect()
  }

  connect(){
    const token = localStorage.getItem('token');
    this.socket.ioSocket['auth'] = { token }
    this.socket.connect();
  }

  sendMessage(message: Message){
    this.socket.emit('send-message', message);
  }

  messagesSeen(partnerId: number){
    this.socket.emit('messages-seen', partnerId);
  }

  allMessagesSeen(partnerId: number){
    this.socket.emit('all-messages-seen', partnerId);
  }

  onNewMessage(): Observable<Message>{
    return this.socket.fromEvent('new-message')
  }

  onMessageSent(): Observable<Message>{
    return this.socket.fromEvent('message-sent')
  }

  onNewMessageNotification(): Observable<Message>{
    return this.socket.fromEvent('new-message-not')
  }

  onNewMessagesSeen(): Observable<Message>{
    return this.socket.fromEvent('messages-seen')
  }

  onAllMessagesSeen(): Observable<Message>{
    return this.socket.fromEvent('all-messages-seen')
  }
}
