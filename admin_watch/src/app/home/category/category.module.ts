import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';

import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddNewComponent } from './add-new/add-new.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
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

const routes: Routes = [

  {path:'',component:CategoryComponent,
    children:
    [
      {path:'',component:ListCategoriesComponent},
      {path:'update/:categoryId',component:EditCategoryComponent},
      {path:'add-new',component:AddNewComponent}
    ]
  }
];

@NgModule({
  declarations: [
    CategoryComponent,
    EditCategoryComponent,
    AddNewComponent,
    ListCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    FormlyModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule ,
    MatInputModule 
  ]
})
export class CategoryModule { }
