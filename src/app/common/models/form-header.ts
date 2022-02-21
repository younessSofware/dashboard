import { ValidatorFn } from '@angular/forms';
import { Header } from './header';
export interface FormHeader extends Header{
  validators?: {
    validatorFn: ValidatorFn,
    message: string
  }[],
  selectOptions?: {
    options: any[],
    valueProperty: string,
    nameProperty: string
  }
}
