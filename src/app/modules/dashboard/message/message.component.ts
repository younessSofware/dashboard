import { DomSanitizer } from '@angular/platform-browser';
import { MessageType } from './../../../common/models/enums/message-type';
import { ChatService } from './../../../services/chat.service';
import { Message } from './../../../common/models/Message';
import { MessageState } from './../../../common/models/enums/message-state';
import { DashboardService } from './../../../services/dashboard.service';
import { AccountRole } from './../../../common/models/enums/account-role';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as uuid from 'uuid';

type Section = 'clients' | 'delivery men' | 'stores'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @ViewChild('messagesArea') messagesArea: ElementRef

  section: Section = 'stores';
  recording = false;
  recordedAudio: any[] = [];
  mediaRecorder: any;
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
  willSendAudio = false;
  messagesPagination = {
    skip: 0,
    take: 20
  }

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.getCorrespondents();
    this.chatService.onNewMessage().subscribe({
      next: message => {
        // console.log("new message", message);
        message.receiver = 15
        message.id = 150
        this.messages.push(message);
        // console.log("new message", message);
      }
    })
    this.chatService.onMessageSent().subscribe({
      next: message => {
        // console.log("message sent", message);

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
    this.time = 0;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia ({audio: true})
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.willSendAudio = false;
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = (e: any) => {
          this.recordedAudio.push(e.data);
        }
        this.timer = setInterval(() => {
          this.time++
        }, 1000);
        this.mediaRecorder.onstop = () => {
          if(this.willSendAudio){
            // console.log("recOrded auDio ", this.recordedAudio);

            const blob = new Blob(this.recordedAudio, { 'type' : 'audio/ogg; codecs=opus' });

            const reader = new FileReader();
            // console.log("blob", blob);
            reader.addEventListener('load', (event: any) => {
              console.log("hi it's loaded");
              console.log(event.target.result);
              this.sendMessage(event.target.result, MessageType.AUDIO)
            });
            reader.readAsDataURL(blob);
          }
          this.recordedAudio = [];
        }
        console.log(this.mediaRecorder.state);
      })
      .catch(function(err) {
      });
    } else {
    }
  }

  stopRecording(){
    this.mediaRecorder.stop();
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
    this.dashboardService.getMessages(this.selectedAccount, this.messagesPagination).subscribe({
      next: (resp: any) => {
        this.messages.unshift(...resp.data)
        if(this.messagesPagination.skip == 0){
          setTimeout(() => {
            this.scrollToBottom()
            this.messagesLoading = false;
          }, 500);
        }else this.messagesLoading = false;
        this.scrollToBottom(100)
        this.messagesPagination.skip += this.messagesPagination.take
      },
      error: err => {
        this.messagesError = err;
        this.messagesLoading = false;
      }
    })
  }

  onScroll(){
    if(!this.messagesLoading && this.messagesArea.nativeElement.scrollTop <= 50){
      this.getMessages();
    }
  }

  scrollToBottom(y = this.messagesArea.nativeElement.scrollHeight){
    this.messagesArea.nativeElement.scrollTop = y
  }

  accountAvatar(){
    return './../../../../assets/store.png'
  }

  isMyMessage(message: Message){
    return message.receiver == this.selectedAccount
  }

  sendMessage(content: string, type: MessageType){
    const message: Message = {
      uuid: uuid.v4(),
      text: type == MessageType.TEXT ? content : '',
      media: type != MessageType.TEXT ? content : '',
      state: MessageState.CREATED,
      createdAt: new Date(),
      receiver: this.selectedAccount,
      type
    }
    this.messages.push(message)
    this.chatService.sendMessage(message)
  }

  sendTextMessage(){
    this.sendMessage(this.textMessage, MessageType.TEXT)
    this.textMessage = "";
  }

  sendImage(event: any) {
    this.sendMessage(event.target.result, MessageType.IMAGE)
  }

  uploadPhoto(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (event) => this.sendImage(event));
  }

  readImage(blob: any){
    return blob;
  }


  sendAudio(){
    this.willSendAudio = true;
    this.stopRecording();
  }
}
