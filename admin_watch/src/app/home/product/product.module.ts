import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormlyModule } from '@ngx-formly/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [

  {path:'',component:ProductComponent,
    children:
    [
      {path:'',component:ListProductsComponent},
      {path:'detail/:productId',component:DetailProductComponent},
      {path:'update/:productId',component:EditProductComponent},
      {path:'addnew',component:AddProductComponent}
    ]
  }
];

@NgModule({
  declarations: [
    ProductComponent,
    DetailProductComponent,
    EditProductComponent,
    AddProductComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    FormlyModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    SharedModule
  ]
})
export class ProductModule { }
