import { CategoryService } from './../../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../../Category';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  name: string = '';
  cate:any;
  accName:any;
  listCate:any;
  form!: FormGroup;
  fields: FormlyFieldConfig[] = [
   
    {
      key: 'Category Name',
      type: 'input',
      templateOptions: {
        label: 'Category Name',
        placeholder: 'Enter name',
      }
    }
    
    ];
  constructor(private service:CategoryService,private rout:Router) { }

  ngOnInit(): void {
    this.cate=new Category();
    this.loadCategory();
  }
  loadCategory()
  {
    this.service.getAllCategory().subscribe(res=>{
      this.listCate=res;
    })
  }
  add(){
      let check = false;
    for(let i in this.listCate){
      if(this.listCate[i].name == this.cate?.name){
        check= true;
         break;
      }
    }
    if (this.cate.name == undefined || this.cate.name.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Nhập tên danh mục!',

      })
    }
      else if (!check){
        this.cate.date = new Date();
        this.cate.totalProduct = 0;

          this.service.addCategory(this.cate).subscribe(result=>
         {
           Swal.fire({
             position: 'top',
             icon: 'success',
             text: 'Tạo danh mục thành công!',
             showConfirmButton: false,
             timer: 1500
          });
          this.loadCategory();
          this.rout.navigate(['/category']);
         })
      }
      else{
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Lỗi',
          text: 'Tên danh mục đã tồn tại!',
          showConfirmButton: false,
          timer: 1500
       });
      }
    
    }
}
