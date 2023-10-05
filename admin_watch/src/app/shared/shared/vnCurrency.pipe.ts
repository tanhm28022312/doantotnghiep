import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnCurrency'
})
export class VnCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    // Sử dụng toLocaleString để định dạng số với đơn vị VND
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

}
