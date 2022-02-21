import { NgxHowlerService } from 'ngx-howler';
import { Component, OnInit } from '@angular/core';
import { Howl  } from 'howler';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  play = false;
  audio: Howl;
  time = 0
  duration = 0;
  timer: any;

  constructor(private howler: NgxHowlerService) { }

  ngOnInit(): void {
    this.howler.register('audio', {
      src: ['./../../../../../assets/test-audio.mp3'],
    }).subscribe(status => {
      this.audio = this.howler.get('audio');
      this.duration = this.audio.duration()
    });
    this.audio.on('end', ()=> {
      this.toggleAudio()
      this.time = 0;
    })
  }

  toggleAudio(){
    if(this.play){
      this.play = false;
      this.audio.pause();
      clearInterval(this.timer);
    }else{
      this.play = true;
      this.howler.get('audio').play()
      this.duration = this.audio.duration()
      this.timer = setInterval(() => {
        this.time = this.audio.seek();
      }, 1000)
    }
  }
  updateAudioPos(){
    this.audio.seek(this.time);
  }
  getTime(){
    let time = Math.floor(this.time);

    let s: any = time % 60;
    time = Math.floor(time / 60);

    let m: any = time % 60
    time = Math.floor(time / 60);

    let h: any = time;

    h = (h < 10 ? '0' : '') + h
    m = (m < 10 ? '0' : '') + m
    s = (s < 10 ? '0' : '') + s


    return (this.duration > 3600 ? h + ' : ' : '') + m + ' : ' + s
  }
}
