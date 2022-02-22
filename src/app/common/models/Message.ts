import { MessageType } from './enums/message-type';
import { MessageState } from './enums/message-state';
export interface Message{
  id?: number;
  uuid?: string;
  content: string;
  state: MessageState;
  sender?: any;
  receiver?: any;
  createdAt?: Date;
  type?: MessageType;
}
