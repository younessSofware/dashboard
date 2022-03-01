import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-audio-slider',
  templateUrl: './audio-slider.component.html',
  styleUrls: ['./audio-slider.component.scss']
})
export class AudioSliderComponent implements OnInit {
  @ViewChild('slider') slider: ElementRef;

  @Input() max: number = 0;
  @Input() min: number = 0;
  @Input() value: number = 0;
  @Output() onValueChange = new EventEmitter();

  get percentValue(){

    if(this.max - this.min == 0) return 0;
    return this.value * 100 / (this.max - this.min)
  }

  constructor() { }

  ngOnInit(): void {
  }

  changePosition(event: any){
    event.stopPropagation();
    this.onValueChange.emit(event.offsetX * this.max / this.slider.nativeElement.clientWidth)
  }
}
