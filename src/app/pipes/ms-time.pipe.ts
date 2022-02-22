import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msTime'
})
export class MsTimePipe implements PipeTransform {

  transform(value: number): unknown {

    let time = Math.floor(value);

    let s: any = time % 60;
    time = Math.floor(time / 60);

    let m: any = time % 60
    time = Math.floor(time / 60);

    let h: any = time;

    h = (h < 10 ? '0' : '') + h
    m = (m < 10 ? '0' : '') + m
    s = (s < 10 ? '0' : '') + s

    return (h > 0 ? h + ' : ' : '') + m + ' : ' + s
  }

}
