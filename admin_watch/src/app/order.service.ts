import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  editOrder(id: any, order: any) {
    return this.httpClient.put(`http://localhost:3000/api/orders/${id}`, order);
  }
}
