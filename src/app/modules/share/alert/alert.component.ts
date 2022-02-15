import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() title = "";
  @Input() message = "";
  @Input() type = "";

  color = "";
  icon = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['type']){
      this.setColor();
    }
  }

  setColor(){
    switch (this.type) {
      case 'success':
        this.color = 'green';
        this.icon = 'fas fa-check';
        break;
      case 'info':
        this.color = 'blue';
        this.icon = 'fas fa-info';
        break;
      case 'danger':
        this.color = 'red';
        this.icon = 'fas fa-triangle-exclamation';
        break;

      default:
        break;
    }
  }
}
