import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumeText'
})
export class ResumeTextPipe implements PipeTransform {
  transform(value: string, length: number | null): string {
    if(length == null) return value;
    return length ? value.slice(0, length) + (length < value.length ? '...' : '') : value ;
  }

}
