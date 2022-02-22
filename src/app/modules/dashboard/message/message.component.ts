import { MessageType } from './../../../common/models/enums/message-type';
import { ChatService } from './../../../services/chat.service';
import { Message } from './../../../common/models/Message';
import { MessageState } from './../../../common/models/enums/message-state';
import { DashboardService } from './../../../services/dashboard.service';
import { AccountRole } from './../../../common/models/enums/account-role';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

type Section = 'clients' | 'delivery men' | 'stores'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  section: Section = 'stores';
  recording = false;
  time = 0;
  timer: any;
  usersLoading = false;
  messagesLoading = false;
  clients: any[] = [];
  deliverMen: any[] = [];
  stores: any[] = [];
  selectedAccount: number;
  correspondentsError: string | null;
  messagesError: string | null;
  textMessage: string;
  messages: Message[] = [];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.getCorrespondents();
    this.chatService.onNewMessage().subscribe({
      next: message => {
        console.log("new message", message);
        message.receiver = 15
        this.messages.push(message);
        // console.log("new message", message);
      }
    })
    this.chatService.onMessageSent().subscribe({
      next: message => {
        console.log("message sent", message);

        this.messages = this.messages.map(msg => {
          if(msg.uuid == message.uuid) return message
          return msg;
        })
        // console.log(this.messages);
        // console.log("message sent", message);
      }
    })
  }

  startRecoding(){
    if(this.recording) return;
    this.recording = true;
    this.timer = setInterval(() => {
      this.time++
    }, 1000)
  }

  stopRecording(){
    this.recording = false;
    clearInterval(this.timer);
  }

  getTime(){

  }

  changeSection(section: Section){
    this.section = section
    this.getCorrespondents();
  }

  accounts(){
    return this.section == 'clients' ? this.clients : (this.section == 'delivery men' ? this.deliverMen : this.stores)
  }

  getQueryParams(){
    this.route.queryParamMap.subscribe({
      next: params => {
        const id = params.get('id');
        const name = params.get('name');
        const role = params.get('role');

        const account = {id, name, role};
        if(role == AccountRole.CLIENT){
          this.clients.unshift(account);
          this.section = 'clients';
        }
        else if(role == AccountRole.STORE){
          this.stores.unshift(account);
          this.section = 'stores'
        }
        else if(role == AccountRole.DELIVERY_MAN){
          this.deliverMen.unshift(account);
          this.section = 'delivery men'
        }

        if(account.id){
          this.selectedAccount = +account.id;
          this.getMessages();
        }
      }
    })
  }

  getCorrespondents(){
    this.usersLoading = true;
    this.correspondentsError = null;
    console.log("correspondents");
    this.dashboardService.getCorrespondents().subscribe({
      next: resp => {
        this.usersLoading = false;
      },
      error: err => {
        console.log(err);
        this.correspondentsError = err;
        this.usersLoading = false;
      }
    })
  }

  getMessages(){
    this.messagesLoading = true;
    this.messagesError = null;
    this.dashboardService.getMessages(this.selectedAccount).subscribe({
      next: resp => {
        this.messagesLoading = false;
      },
      error: err => {
        this.messagesError = err;
        this.messagesLoading = false;
      }
    })
  }

  accountAvatar(){
    return './../../../../assets/store.png'
  }

  sendMessage(){
    const message: Message = {
      uuid: uuid.v4(),
      content: this.textMessage,
      state: MessageState.CREATED,
      createdAt: new Date(),
      receiver: this.selectedAccount,
      type: MessageType.TEXT
    }
    this.messages.push(message)
    this.chatService.sendMessage(message)
    this.textMessage = "";
  }

  isMyMessage(message: Message){
    return message.receiver == this.selectedAccount
  }
}
