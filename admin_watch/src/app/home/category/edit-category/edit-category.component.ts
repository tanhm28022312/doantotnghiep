import { ProductService } from './../../../product.service';
import { CategoryService } from 'src/app/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs'

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  name: string = '';
  cate: any;
  cateId: any;
  formSearch!: FormGroup;
  listStatus = [
    { value: false, label: 'Out Of Stock' },
    { value: true, label: 'In Stock' },
  ];
  constructor(
    private service: CategoryService,
    private route: ActivatedRoute,
    private rout: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      name: [''],
      date: ['']
    });

    this.cateId = this.route.snapshot.paramMap.get('categoryId');
    this.cate = this.service
      .getCategoryById(this.cateId)
      .subscribe((result) => {
        this.cate = result;
        this.getValue();
      });

  }
  getValue() {
    this.formSearch.controls['name']?.setValue(this.cate.name);
    this.formSearch.controls['date']?.setValue(this.cate.date);
  }
  status = true;
  update() {
    if (this.formSearch.controls['name']?.value == undefined || this.formSearch.controls['name']?.value == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập tên danh mục!',
      })
    }
    else {
      this.cate.name = this.formSearch.controls['name']?.value;
      this.cate.totalProduct = this.formSearch.controls['totalProduct']?.value;
      this.cate.date = new Date();
      this.service.editCategory(this.cateId, this.cate).subscribe((result) => {
        //update all product by category id
        this.updateProducts(this.cateId, this.cate.status);
        Swal.fire({
          position: 'top',
          icon: 'success',
          text: 'Cập nhật thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.rout.navigate(['/category']);
      });
    }
  }
  back() {
    window.history.back();
  }
  updateProducts(cateId: any, status: any) {
    let prodList: any;
    this.productService.getProductByCategoryId(cateId).pipe(tap(res => {
      prodList = res;
      prodList.forEach((x: any) => {
        x.status = status;
        this.productService.editProduct(x.id, x).subscribe();
      })
    })).subscribe()
  }
}
