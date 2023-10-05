import { VnCurrencyPipe } from './vnCurrency.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VnCurrencyPipe
  ],
  exports: [
    VnCurrencyPipe
  ]
})
export class SharedModule { }
