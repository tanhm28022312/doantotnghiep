import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient: HttpClient) {

  }
  postOrderDetail(order: any) {
    return this.httpClient.post(`http://localhost:3000/api/orderDetails`, order);
  }

  getByOrderId(orderId: any) {
    return this.httpClient.get(`http://localhost:3000/api/orderDetails?orderId=${orderId}`);
  }
  getAllOrderDetails() {
    return this.httpClient.get(`http://localhost:3000/api/orderDetails`);
  }
}
