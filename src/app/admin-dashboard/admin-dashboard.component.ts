import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { Product } from 'src/shared/models/Product.model';
import { Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  id: string = "";
  name: string = "";
  description: string = "";
  category: string = "";
  price: number = 0;
  stockQty: number = 0;
  quantity: number = 0;
  image: string = "";


  products: Product[] = [];
  // newProduct: Product = new Product();
  editProduct: Product = new Product();
  isEditing: boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts() {
    this.api.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products)
    },
      (error) => {
        console.log(error);
      });
  }

  addProduct() {
    const newProduct = {
      id : this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
      stockQty: this.stockQty,
      quantity: this.quantity,
      image: this.image

    } as Product;

    this.api.addProduct(newProduct).subscribe(product => {
      console.log(product);
      alert("Product added");
    }, error => console.log(error));
  }

  deleteProduct(product: Product) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.api.deleteProduct(product.id).subscribe(() => {
        console.log("Product deleted successfully!");
        const index = this.products.indexOf(product);
        if (index > -1) {
          this.products.splice(index, 1);
        }
        alert("Product deleted successfully!");
      }, error => console.log(error));
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

}
