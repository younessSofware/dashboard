import { Button } from './button';
import { Header } from './header';
export interface List{
  headers:Header[],
  icon: string,
  title: string,
  name: string,
  rowsButtons?: Button[],
  buttons?: Button[]
}
