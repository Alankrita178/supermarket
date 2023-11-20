import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userCart: Array<Product> = [];
  user: any;


  constructor(private http: HttpClient) { 
    //this.userCart = JSON.parse(localStorage.getItem('user')!).cart;
   // console.log(this.userCart);
  }
  //productUrl = "https://localhost:7291/api/Products"

  getProducts() : Observable<any[]>{
    return this.http.get<any[]>("https://localhost:7291/api/Products");
  }

  productDetailsById(id:string) : Observable<any[]>{
    return this.http.get<any[]>(`https://localhost:7291/api/Products/${id}`);
  }

  addProduct(product:Product) : Observable<any[]>{
    return this.http.post<any[]>(`https://localhost:7291/api/Products`,product)
  }

  editProduct(id:string,product:Product) : Observable<any[]>{
    return this.http.put<any[]>(`https://localhost:7291/api/Products/${id}`,product)
  }

  deleteProduct(id:string) : Observable<any>{
    return this.http.delete<any>(`https://localhost:7291/api/Products/${id}`)
  }


  registerUser(user: any): Observable<any>{
    return this.http.post<any>(`https://localhost:7291/api/Users/register`, user);
  }

  loginUser(user:any):Observable<any>{
    return this.http.post<any>(`https://localhost:7291/api/Users/login`,user)
  }

  addToCart(userId:string, product: any):Observable<any>{
    return this.http.post<any>(`https://localhost:7291/api/Users/${userId}/cart`, product);
  }

  displayCart(userId:string) : Observable<any>{
    return this.http.get<any>(`https://localhost:7291/api/Users/${userId}/cart`)
  }

  removeProductFromCart(userId:string,id:string) :Observable<any>{
    return this.http.delete<any>(`https://localhost:7291/api/Users/${userId}/cart/${id}`)
  }


  
}
