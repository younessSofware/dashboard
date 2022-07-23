import { MessageType } from './enums/message-type';
import { MessageState } from './enums/message-state';
export interface Message{
  id?: number;
  uuid?: string;
  text: string;
  media: string;
  state: MessageState;
  sender?: any;
  receiver?: any;
  createdAt?: Date;
  type?: MessageType;
}
