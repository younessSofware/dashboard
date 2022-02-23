import { NgxHowlerService } from 'ngx-howler';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Howl  } from 'howler';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnChanges {

  play = false;
  audio: Howl;
  time = 0
  duration = 0;
  timer: any;
  @Input() src: string;
  @Input() id: number | undefined;

  constructor(private howler: NgxHowlerService) { }

  ngOnInit(): void {
    if(this.src && this.id) this.registerHowler();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if((changes['src'] && this.id) || (this.id && this.src)){
        this.registerHowler();
      }
  }

  registerHowler(){
    this.howler.register("audio-" + this.id, {
      src: [this.src],
    }).subscribe(status => {
      this.audio = this.howler.get("audio-" + this.id);
      this.duration = this.audio.duration();
      console.log(this.duration);
      this.audio.on('end', ()=> {
        this.toggleAudio()
        this.time = 0;
      })
    });
  }

  toggleAudio(){
    if(this.play){
      this.play = false;
      this.audio.pause();
      clearInterval(this.timer);
    }else{
      this.play = true;
      this.audio.play()
      this.duration = this.audio.duration()
      this.timer = setInterval(() => {
        this.time = this.audio.seek();
      }, 100)
    }
  }
  updateAudioPos(pos: number){
    this.audio.seek(pos);
  }
}
