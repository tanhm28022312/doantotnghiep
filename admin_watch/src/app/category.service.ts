import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './home/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private categoryService:HttpClient) { }
  getAllCategory()
  {
    return this.categoryService.get("http://localhost:3000/api/categories");
   
  }
  addCategory(category:any):Observable<Category>
  {
    return this.categoryService.post<Category>("http://localhost:3000/api/categories",category);
  }
  editCategory(categoryId:any,category:any)
  {
    return this.categoryService.put("http://localhost:3000/api/categories/"+categoryId,category);

  }
  getCategoryById(categoryId:any)
  {
    return this.categoryService.get("http://localhost:3000/api/categories/"+categoryId);
  }
  deleteCategory(categoryId:any)
  {
    return this.categoryService.delete("http://localhost:3000/api/categories/"+categoryId);
  }
}
