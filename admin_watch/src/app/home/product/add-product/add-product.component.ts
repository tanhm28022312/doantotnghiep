import { Category } from './../../Category';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from './../../../product.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Product } from '../../Product';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product:any;
  file:any=File;
  image:any;
  status:any;
  form!:FormGroup;
  listCate:any;
  fields: FormlyFieldConfig[] = [
    {
      key: 'productName',
      type: 'input',
      templateOptions: {
        label: 'Product name',
        placeholder: 'Enter name',
      }
    },
    {
      key: 'shortDescription',
      type: 'input',
      templateOptions: {
        label: 'Short Description',
        placeholder: 'Enter Description',
      }
    },
    {
      key: 'initialPrice',
      type: 'input',
      templateOptions: {
        label: 'Initial Price',
        placeholder: 'Enter Initial Price',
      }
    },
    {
      key: 'Discount',
      type: 'input',
      templateOptions: {
        label: 'Discount',
        placeholder: 'Enter Discount',
      }
    },
    {
      key: 'Quantity',
      type: 'input',
      templateOptions: {
        label: 'Quantity',
        placeholder: 'Enter Quantity',
      }
    },
    
    {
        key: 'status',
        type: 'radio',
        templateOptions: {
          type: 'radio',
          label: 'Status',
          name: 'status',
          options: [{ value:'In Stock', key: true }, { value: 'Out Of Stock ', key:false }]
        }
    },
    {
      key: 'Power',
      type: 'input',
      templateOptions: {
        label: 'Power',
        placeholder: 'Enter Power',
      }
    },
    {
      key: 'Rope Material',
      type: 'input',
      templateOptions: {
        label: 'Rope Material',
        placeholder: 'Enter Rope Material',
      }
    },
    {
      key: 'Glass Material',
      type: 'input',
      templateOptions: {
        label: 'Glass Material',
        placeholder: 'Enter Glass Material',
      }
    },
    {
      key: 'Trademark',
      type: 'input',
      templateOptions: {
        label: 'Trademark',
        placeholder: 'Enter Trademark',
      }
    },
    {
      key: 'Origin',
      type: 'input',
      templateOptions: {
        label: 'Origin',
        placeholder: 'Enter Origin',
      }
    },
    {
      key: 'imageUrl',
      type: 'input',
      templateOptions: {
        label: 'Upload file',
        placeholder: 'Choose file',
      }
    }
    ];
  constructor(private service:ProductService, private routo: Router, private cateService: CategoryService) { }

  ngOnInit(): void {
    this.product=new Product();
    this.loadCategories();
  }
  onSelectedFile(event:any)
  {
    this.file=event.target.files[0];
  }

  back()
  {
    window.history.back();
  }
  add()
  {
    if (this.product.productName == undefined || this.product.productName.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập tên sản phẩm!',

      })
    }
    else if (this.product.shortDescription == undefined || this.product.shortDescription.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập thông tin mô tả!',

      })
    }
    else if (this.product.initialPrice == undefined || this.product.initialPrice.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập giá của sản phẩm!',

      })
    }
    else if (this.product.quantity == undefined || this.product.quantity.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải nhập số lượng sản phẩm!',

      })
    }
    else if (this.product.status == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải chọn tình trạng hàng!',

      })
    }
    else if (this.product.categoryId == undefined || this.product.categoryId.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải chọn loại danh mục!',

      })
    }
    else if (this.product.imageUrl == undefined || this.product.imageUrl.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải chọn hình ảnh sản phẩm!',

      })
    }
    else {this.product.date = new Date();
    this.product.imageUrl=this.image;
    if(!this.product.discount){
      this.product.discount = 0;
    }
    this.product.status == 'true' ? true : false;
    this.service.addProduct(this.product).subscribe(result=>
      {
        //lấy chi tiết cate theo cate đã chọn
        this.cateService.getCategoryById(this?.product?.categoryId).subscribe((cate:Category) =>{
          cate.totalProduct = Number(cate.totalProduct) + 1;
          this.cateService.editCategory(cate.id,cate).subscribe( () =>{
            Swal.fire({
              position: 'top',
              icon: 'success',
              text: 'Tạo sản phẩm thành công!',
              showConfirmButton: false,
              timer: 1500
            });
            this.routo.navigate(['/product']);
          });
        })
      })
    }
  }

  uploadFile(file: any){
    this.image = file.target.files[0].name;
    this.product.imageUrl= this.image;
  }
  loadCategories(){
    this.cateService.getAllCategory().subscribe(res=>{
      this.listCate=res;
    })
  }
}
