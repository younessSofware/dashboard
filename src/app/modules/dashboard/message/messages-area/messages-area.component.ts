import { ChatService } from './../../../../services/chat.service';
import { MessageType } from './../../../../common/models/enums/message-type';
import { Message } from './../../../../common/models/Message';
import { DashboardService } from './../../../../services/dashboard.service';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageState } from 'src/app/common/models/enums/message-state';

@Component({
  selector: 'app-messages-area',
  templateUrl: './messages-area.component.html',
  styleUrls: ['./messages-area.component.scss']
})
export class MessagesAreaComponent implements OnInit, OnChanges {

  @ViewChild('messagesArea') messagesArea: ElementRef;

  @Input() partnerId: any;

  loading = false;
  error: string | null;
  messagesPagination = {
    skip: 0,
    take: 20
  }
  messages: Message[] = [];
  messagesCount = 0;

  constructor(private dashboardService: DashboardService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.setChatSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['partnerId'] && this.partnerId){
      console.log("partnerId changed");
      this.messages = [];
      this.messagesPagination.skip = 0;
      this.messagesCount = 0;
      this.getMessages();
    }
  }

  setChatSubscription(){
    this.chatService.onNewMessage().subscribe({
      next: message => {
        this.addMessage(message)
      }
    })
    this.chatService.onMessageSent().subscribe({
      next: message => {
        this.messages = this.messages.map(msg => {
          if(msg.uuid == message.uuid) return message
          return msg;
        })
      }
    })
  }

  getMessages(){
    this.loading = true;
    this.error = null;
    this.dashboardService.getMessages(this.partnerId, this.messagesPagination).subscribe({
      next: (resp: any) => {
        console.log("messages: ", resp);
        this.messages.unshift(...resp.data.messages.reverse())
        this.messagesCount = resp.data.count;
        if(this.messagesPagination.skip == 0){
          setTimeout(() => {
            this.scrollToBottom()
            this.loading = false;
          }, 100);
        }else this.loading = false;
        this.scrollToBottom(100)
        this.messagesPagination.skip += this.messagesPagination.take
      },
      error: err => {
        this.error = err;
        this.loading = false;
      }
    })
  }

  onScroll(){
    if(this.messages.length >= this.messagesCount) return;
    if(!this.loading && this.messagesArea.nativeElement.scrollTop <= 50){
      this.getMessages();
    }
  }

  scrollToBottom(y = this.messagesArea.nativeElement.scrollHeight){
    this.messagesArea.nativeElement.scrollTop = y
  }

  addMessage(message: Message){
    this.messages.push(message);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  allowToShowDate(ind: number){
    if(ind == 0) return true;

    const messageDate = new Date(this.messages[ind].createdAt as any as string);
    const lastMessageDate = new Date(this.messages[ind - 1].createdAt as any as string);

    return messageDate.getFullYear() != lastMessageDate.getFullYear() ||
           messageDate.getMonth() != lastMessageDate.getMonth() ||
           messageDate.getDate() != lastMessageDate.getDate();
  }


}
