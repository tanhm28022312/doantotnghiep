import { ProductService } from './../../../product.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  prod: any;
  imageUrl : string = '';
  listStatus = [
    { value: false, label: 'Hết hàng' },
    { value: true, label: 'Còn hàng' },
  ];
  
  formSearch!: FormGroup;
  prodId: any;
  listCate: any;

  constructor(
    private service:ProductService,
    private route: ActivatedRoute,
    private cateService: CategoryService,
    private rout: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.prodId = this.route.snapshot.paramMap.get('productId');
    this.prod = this.service.getProductById(this.prodId).subscribe((result) => {
      this.prod = result;
      this.imageUrl = this.prod.imageUrl;
      this.formSearch = this.fb.group({
        productName: [this.prod.productName],
        shortDescription: [this.prod.shortDescription],
        initialPrice: [this.prod.initialPrice],
        percent: [this.prod.percent],
        quantity: [this.prod.quantity],
        status: [this.prod.status],
        categoryId: [this.prod.categoryId + ''],
        power: [this.prod.power],
        ropeMaterial: [this.prod.ropeMaterial],
        glassMaterial: [this.prod.glassMaterial],
        trademark: [this.prod.trademark],
        origin: [this.prod.origin]
      });
    });
  }
  loadCategories(){
    this.cateService.getAllCategory().subscribe(res=>{
      this.listCate=res;
    })
  }
  updateProduct() {
    if (this.formSearch.value.productName == undefined || this.formSearch.value.productName.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập tên sản phẩm!',

      })
    }
    else if (this.formSearch.value.shortDescription == undefined || this.formSearch.value.shortDescription.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập thông tin mô tả!',

      })
    }
    else if (this.formSearch.value.initialPrice == undefined || this.formSearch.value.initialPrice.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập giá của sản phẩm!',

      })
    }
    else if (this.formSearch.value.quantity == null ||this.formSearch.value.quantity == undefined || this.formSearch.value.quantity.length == 0) 
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập số lượng sản phẩm!',

      })
    }
    else if (this.formSearch.value.status == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải chọn tình trạng hàng!',

      })
    }
    else if (this.formSearch.value.categoryId == undefined || this.formSearch.value.categoryId.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải chọn loại danh mục!',

      })
    }
    else if (this.prod.imageUrl == undefined || this.prod.imageUrl.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải chọn hình ảnh sản phẩm!',

      })
    }
    else{
    this.prod.status = this.formSearch.controls['status']?.value;
    this.prod.productName=this.formSearch.controls['productName']?.value;
    this.prod.shortDescription=this.formSearch.controls['shortDescription']?.value;
    this.prod.initialPrice=this.formSearch.controls['initialPrice']?.value;
    this.prod.percent=this.formSearch.controls['percent']?.value;
    this.prod.quantity=this.formSearch.controls['quantity']?.value;
    this.prod.categoryId=this.formSearch.controls['categoryId']?.value;
    this.prod.power=this.formSearch.controls['power']?.value;
    this.prod.ropeMaterial=this.formSearch.controls['ropeMaterial']?.value;
    this.prod.glassMaterial=this.formSearch.controls['glassMaterial']?.value;
    this.prod.trademark=this.formSearch.controls['trademark']?.value;
    this.prod.origin=this.formSearch.controls['origin']?.value;
    this.prod.imageUrl=this.imageUrl;
    this.service.editProduct(this.prodId, this.prod).subscribe((result) => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        text: 'Cập nhật sản phẩm thành công!',
        showConfirmButton: false,
        timer: 1500
      });
      this.rout.navigate(['/product']);
    });
  }
  }
  back() {
    window.history.back();
  }

  uploadFile(event:any){
      this.imageUrl = event.target.files[0].name;
  }
}
