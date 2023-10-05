import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDetailService } from '../order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetails: any[] = [];
  constructor(
    private orderDetailSerice: OrderDetailService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.orderDetailSerice.getByOrderId(this.data?.id).subscribe((res: any) => {
      this.orderDetails = res;
    })
  }

}
