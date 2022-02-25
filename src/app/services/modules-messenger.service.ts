import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

interface MessengerData {
  type: "new-message",
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class ModulesMessengerService {

  private subject = new Subject<MessengerData>();

  sendMessage(data: MessengerData) {
      this.subject.next(data);
  }

  getMessage(): Observable<MessengerData> {
      return this.subject.asObservable();
  }

}
