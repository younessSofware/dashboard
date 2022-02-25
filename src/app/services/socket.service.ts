import { Socket } from 'ngx-socket-io';
import { Message } from './../common/models/Message';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
    socket.connect()
  }

  connect(){
    const token = localStorage.getItem('token');
    this.socket.ioSocket['auth'] = { token }
    this.socket.disconnect()
    this.socket.connect();
  }

  sendMessage(message: Message){
    this.socket.emit('send-message', message);
  }

  messagesSeen(payload: number){
    this.socket.emit('messages-seen', payload);
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

  onMessagesSeen(): Observable<number>{
    return this.socket.fromEvent('messages-seen')
  }

}
