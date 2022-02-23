import { ChatService } from './../../../../services/chat.service';
import { MessageType } from './../../../../common/models/enums/message-type';
import { Message } from './../../../../common/models/Message';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as uuid from 'uuid';
import { MessageState } from 'src/app/common/models/enums/message-state';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input() partnerId: number;
  @Output() onMessage = new EventEmitter()

  textMessage: string;

  recording = false;
  recordedAudio: any[] = [];
  mediaRecorder: any;
  willSendAudio = false;

  time = 0;
  timer: any;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  sendMessage(content: string, type: MessageType){
    const message: Message = {
      uuid: uuid.v4(),
      text: type == MessageType.TEXT ? content : '',
      media: type != MessageType.TEXT ? content : '',
      state: MessageState.CREATED,
      createdAt: new Date(),
      receiver: this.partnerId,
      type
    }
    this.onMessage.emit(message);
    this.chatService.sendMessage(message)
  }

  sendImage(event: any){
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', (event: any) => {
      this.sendMessage(event.target.result, MessageType.IMAGE)
    });
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
            const blob = new Blob(this.recordedAudio, { 'type' : 'audio/ogg; codecs=opus' });
            const reader = new FileReader();
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

  sendAudio(){
    this.willSendAudio = true;
    this.stopRecording();
  }

  sendTextMessage(){
    if(!this.textMessage) return;
    this.sendMessage(this.textMessage, MessageType.TEXT)
    this.textMessage = "";
  }
}
