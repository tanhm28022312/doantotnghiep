import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './home/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private productService:HttpClient) { }
  // getAllProduct()
  // {
  //   return this.productService.get("http://localhost:3000/api/products");
  // }
  // addProduct(product:any):Observable<Product>
  // {
  //   return this.productService.post<Product>("http://localhost:3000/api/products",product);
  // }
  // editProduct(productId:any,product:any)
  // {
  //   return this.productService.put("http://localhost:3000/api/products/"+productId,product);
  // }
  // getProductById(productId:any)
  // {
  //   return this.productService.get("http://localhost:3000/api/products/"+productId);
  // }
  // deleteProduct(productId:any)
  // {
  //   return this.productService.delete("http://localhost:3000/api/products/"+productId);
  // }
  // deleteProdsByCateId(cateId:number)
  // {
  //   return this.productService.delete('http://localhost:3000/api/products?categoryId='+cateId);
  // }
  // getProductByCategoryId(categoryId:any)
  // {
  //   return this.productService.get('http://localhost:3000/api/products?categoryId='+categoryId);
  // }
  // getAllOrder()
  // {
  //   return this.productService.get("http://localhost:3000/api/orders");
  // }
  // getAllFeedback()
  // {
  //   return this.productService.get("http://localhost:3000/api/contacts");
  // }
  getAllProduct()
  {
    return this.productService.get("http://localhost:3000/api/products");
  }
  addProduct(product:any):Observable<Product>
  {
    return this.productService.post<Product>("http://localhost:3000/api/products",product);
  }
  editProduct(productId:any,product:any)
  {
    return this.productService.put("http://localhost:3000/api/products/"+productId,product);
  }
  getProductById(productId:any)
  {
    return this.productService.get("http://localhost:3000/api/products/"+productId);
  }
  deleteProduct(productId:any)
  {
    return this.productService.delete("http://localhost:3000/api/products/"+productId);
  }
  deleteProductById(id:string)
  {
    return this.productService.delete('http://localhost:3000/api/products/'+id);
  }
  getProductByCategoryId(categoryId:any):Observable<Product[]>{
    return this.productService.get<Product[]>('http://localhost:3000/api/products?categoryId='+categoryId);
  }
  getAllOrder()
  {
    return this.productService.get("http://localhost:3000/api/orders");
  }
  getAllFeedback()
  {
    return this.productService.get("http://localhost:3000/api/contacts");
  }

}
