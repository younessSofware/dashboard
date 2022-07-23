import { Message } from './../../../../common/models/Message';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() message: Message;
  @Input() partnerId: number;

  constructor() { }

  ngOnInit(): void {
  }

  isMyMessage(message: Message){
    return message.receiver == this.partnerId
  }

  media(message: Message){
    return decodeURIComponent(message.media);
  }
}
