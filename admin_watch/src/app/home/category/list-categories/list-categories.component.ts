import { forkJoin, switchMap, tap, Observable, finalize, map } from 'rxjs';
import { ProductService } from './../../../product.service';
import { CategoryService } from 'src/app/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../Product';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  constructor(private service: CategoryService, private rout: Router, private productservice: ProductService,

  ) { }
  listCate: any;
  listProduct: any;
  productOfCategory: Product[] = [];
  prodIndex: number = 0;
  cateMap = new Map();
  p = 1;
  ngOnInit(): void {
    setTimeout(function () {
      document.getElementById('spinner')!.style.display = "none";
      document.getElementById('content')!.style.display = "block";
    }, 1000)
    this.checkLogin();
    this.getListCates();
    this.loadCategory();

  }
  checkLogin(){
    if(!localStorage.getItem('userInfo')){
      this.rout.navigate(['login']);
    }
  }

  loadCategory() {
    this.service.getAllCategory().subscribe(res => {
      this.listCate = res;
    })
  }
  getListCates() {
    this.service.getAllCategory().pipe(
      tap((res: any) => {
        this.listCate = [...res];
      })
    ).subscribe(() => {
      this.listCate.forEach((category: any, index: number) =>
        this.productservice.getProductByCategoryId(category.id).subscribe((res) => {
          this.listCate[index].products = res;
          this.listCate[index].totalProduct = res.length;
          // console.log(this.listCate)
        }));
    })
  }
  deleteCate(cate: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Các sản phẩm liên quan đến danh mục này đều bị xóa!",
      icon: 'warning',
    
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.service.deleteCategory(cate.id).subscribe(() => {
          this.productOfCategory = cate.products;
          console.log(this.productOfCategory)
          if (this.productOfCategory.length) {
            this.deleteProduct()
          }
          Swal.fire(
            'Đã xóa!',
            'Danh mục này đã được xóa!',
            'success'
          )
          window.location.reload();
        });
      }
    });
}

  /**
   * Remove products specified by index
   * After finish, call func to increase the index and continue the loop 
   */
  deleteProduct() {
    const selectedProduct = this.productOfCategory[this.prodIndex];
    this.productservice.deleteProduct(selectedProduct.id).pipe(finalize(() => this.checkContinueAction())).subscribe();
  }

  /**
   * When call api to delete the last product, the loop will finish
   */
  checkContinueAction() {
    if (this.productOfCategory.length - 1 > this.prodIndex) {
      this.prodIndex++;
      this.deleteProduct();
    } else {
      this.getListCates();
    }
  }

  // deleteCate(cate: any) {

  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You will delete all products related this category!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result: { isConfirmed: any; }) => {
  //       if (result.isConfirmed) {
  //         this.service.deleteCategory(cate.id).subscribe(() => {
  //           this.productservice.getProductByCategoryId((cate.id)).subscribe((list: any) => {
  //             const listObservable: Observable<any>[] = [];
  //             list.forEach((x: any) => {
  //               listObservable.push(this.productservice.deleteProduct(x.id));
  //             });
  //             forkJoin(listObservable).subscribe(() => {
  //               Swal.fire({
  //                 position: 'top',
  //                 icon: 'success',
  //                 text: 'Delete successfully!',
  //                 showConfirmButton: false,
  //                 timer: 1500
  //               });
  //               window.location.reload();
  //             })
  //           })
  //         });
  //       }
  //     });
    
  // }
}
