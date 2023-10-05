import { CategoryService } from './../../../category.service';
import { ProductService } from './../../../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Form, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  constructor(
    private service: ProductService,
    private rout: Router,
    private category: CategoryService,
    private fb: FormBuilder
  ) {}
  formSearch!: FormGroup;
  listProd: any;
  listCate: any;
  searchList: any;
  p = 1;
  ngOnInit(): void {
    setTimeout(function () {
      document.getElementById('spinner')!.style.display = 'none';
      document.getElementById('content')!.style.display = 'block';
    }, 1500);
    this.buildFormSearch();
    this.checkLogin();
    this.getListCate();
    this.getListProd();
    this.onChangeKeySearch();
  }
  onChangeKeySearch() {
    this.formSearch.controls['keySearch'].valueChanges.subscribe((x) => {
      this.searchList = [...this.listProd].filter((prod: any) => {
       return prod.productName.toLowerCase().includes(x.trim().toLowerCase());
      });
    });
  }
  buildFormSearch() {
    this.formSearch = this.fb.group({
      keySearch: [''],
    });
  }
  checkLogin() {
    if (!localStorage.getItem('userInfo')) {
      this.rout.navigate(['login']);
    }
  }

  getListCate() {
    this.category.getAllCategory().subscribe((x) => {
      this.listCate = x;
    });
  }
  getListProd() {
    this.service.getAllProduct().subscribe((result) => {
      this.listProd = result;
      this.listProd = this.listProd.map((x: any) => {
        x.saleOff = (
          x.initialPrice -
          (x.initialPrice * x.percent) / 100
        );
        return x;
      });
      this.searchList = [...this.listProd];
    });
  }
  deleteProd(pro: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn sẽ không thể khôi phục lại được!",
      icon: 'warning',
      
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        this.service.deleteProduct(pro.id).subscribe((result) => {
          Swal.fire('Đã xóa!', 'Sản phẩm này đã bị xóa!', 'success');
          window.location.reload();
        });
      }
    });
  }
}
