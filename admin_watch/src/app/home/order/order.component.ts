import { OrderService } from './../../order.service';
import { AccountService } from './../../account.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private service: AccountService,
    private orderService: OrderService,
    private matDialog: MatDialog,
    private rout:Router
  ) { }
  listOrder: any;
  check = false;
  index: any;
  status:any;
  p=1;
  ngOnInit(): void {
    this.checkLogin();
    this.getAllAccount();
  }
  checkLogin(){
    if(!localStorage.getItem('userInfo')){
      this.rout.navigate(['login']);
    }
  }

  getAllAccount() {
    this.service.getAllOrder().subscribe(res => {
      this.listOrder = res;
      this.listOrder = this.listOrder.sort(function(a:any,b:any){
        return Date.parse(b.createdDate)- Date.parse(a.createdDate);
      })
    })
  }
 
  updateOrderStatus(status: string, index: number) {
    let order:any = this.listOrder[index];
    order.status = status;
    this.orderService.editOrder(order.id, order).subscribe();
  }
  viewDetail(data: any) {
    this.matDialog.open(OrderDetailComponent, {
      data: data,
      width: '80%',
      height: '50%'
    })
  }
}
