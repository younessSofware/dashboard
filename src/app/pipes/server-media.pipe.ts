import { DOMAIN_URL } from './../common/constants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serverMedia'
})
export class ServerMediaPipe implements PipeTransform {

  transform(path: string): string {
    return `${DOMAIN_URL}/${path}`
  }

}
