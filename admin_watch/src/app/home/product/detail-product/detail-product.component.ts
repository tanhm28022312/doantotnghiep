import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  prodId: any;
  prod: any;
  constructor(private service: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductById();  
  }
  getProductById() {
    this.prodId = this.route.snapshot.paramMap.get('productId');
    this.prod = this.service.getProductById(this.prodId).subscribe(result => {
      this.prod = result;
      this.prod.saleOff = (this.prod.initialPrice - this.prod.initialPrice * this.prod.percent / 100);

    })
  }
  back() {
    window.history.back();
  }
}
