import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-audio-slider',
  templateUrl: './audio-slider.component.html',
  styleUrls: ['./audio-slider.component.scss']
})
export class AudioSliderComponent implements OnInit {

  @Input() max: number = 0;
  @Input() min: number = 0;
  @Input() value: number = 0;
  @Output() onValueChange = new EventEmitter();

  get percentValue(){
    // console.log(this.value);

    if(this.max - this.min == 0) return 0;
    return this.value * 100 / (this.max - this.min)
  }

  constructor() { }

  ngOnInit(): void {
  }

  test(event: any){
    // console.log(event.target.clientWidth);
    // console.log(event.target.offsetWidth);
    // console.log(event.offsetX);
    this.onValueChange.emit(event.offsetX * this.max / event.target.clientWidth)
  }
}
