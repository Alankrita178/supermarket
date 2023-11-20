import { Component, OnInit } from '@angular/core';
import { Product } from 'src/shared/models/Product.model';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { computeStyles } from '@popperjs/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId = '';
  totalPrice: any;
  // productId: string = "";
  cart : any[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.userId = userObject.id;
      // console.log(this.userId);
    }

    this.api.displayCart(this.userId)
      .subscribe((data: any) => {
        console.log(data);
        this.cartItems = data;
        this.totalPrice = this.getTotalPrice();
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  
      });


  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
    
  }

  increaseQuantity(product: Product): void {
    const index = this.cartItems.findIndex(item => item.id === product.id);

    if (index >= 0) {
      this.cartItems[index].quantity++;
      this.totalPrice = this.getTotalPrice();
      this.updateCart();
    }
  }

  decreaseQuantity(product: Product): void {
    const index = this.cartItems.findIndex(item => item.id === product.id);

    if (index >= 0) {
      this.cartItems[index].quantity--;

      if (this.cartItems[index].quantity === 0) {
        this.cartItems.splice(index, 1);
      }

      this.totalPrice = this.getTotalPrice();
      this.updateCart();
    }
  }

  deleteProduct(id:string){
    this.api.removeProductFromCart(this.userId, id)
    .subscribe(
      response=>{
        console.log(response);  
              
      },
      error=>{
        console.log(error);
      }
    );
  }

  updateCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
  }

}
  

  









