import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/shared/models/Product.model';
import { computeStyles } from '@popperjs/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = { addedToCart: false };
  productToAdd: any;
  userRole : any;
  userValue: any;
  userId: string = "";
  userCart: Array<Product> = [];
  

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const productId: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.apiService.productDetailsById(productId)
      .subscribe((data: any) => {
        console.log(data);
        this.product = data;
      });
      const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.userRole = userObject.role;
    } else {
      console.log('User not found in localStorage');
    }

  }

  addToCart(product: Product) {
    if (this.product.stockQty > 0) {

      //this.userCart.push(product);

      const userJson = localStorage.getItem('user');
      if (userJson !== null) {
        const userObject = JSON.parse(userJson);
        this.userId = userObject.id;
        console.log(this.userId);
      }

      this.apiService.addToCart(this.userId, this.product)
        .subscribe(
          response => {
            console.log(response);
            this.product.addedToCart = true;
            alert('Item added to cart.');
            this.product.stockQty -= 1;
            this.apiService.editProduct(this.product.id, this.product)
              .subscribe(
                response => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
              );
          },
          error => {
            console.log(error);
            alert('Failed to add item to cart.');
          }
        );
    }
    
    
     else {
      alert('Sorry, Out of stock');
    }
  }

}