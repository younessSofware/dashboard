import { SweetAlertOptions } from 'sweetalert2';
import { RequestMethod } from './RequestMethod';
export interface Button{
  name: string,
  title?: string,
  icon: string,
  color: string,
  dataField?: string,
  request?: {
    url: string,
    method: RequestMethod,
    redirectURL?: string
  },
  routerLink?: {
    link: string,
    query?: any
  },
  confirmation?: SweetAlertOptions<any, any>,
  condition?: string
}
