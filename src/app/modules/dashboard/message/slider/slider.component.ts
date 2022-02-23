import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

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
