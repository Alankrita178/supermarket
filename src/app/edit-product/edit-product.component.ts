import { Component , OnInit} from '@angular/core';
import { Product } from 'src/shared/models/Product.model';
import { ApiService } from 'src/shared/services/api.service';
import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  product: Product = {id: '', name: '',description:'' ,category: '', price: 0,stockQty:0,quantity:0, image: ''};
    id: string = '';
    name: string='';
    description: string = '';
    category: string = '';
    price: number = 0;
    stockQty: number = 0;
    quantity: number = 0;
    image: string = '';
 
  constructor(private api: ApiService, private route: ActivatedRoute) {
  }
 
  ngOnInit() {
    this.route.params.subscribe(params => { // <-- retrieve id parameter from URL
      this.id = params['id'];
      this.api.productDetailsById(this.id)
        .subscribe((product: any) => {
          this.product = product;
          this.id = product.id;
          this.name = product.name;
          this.description = product.description;
          this.category = product.category;
          this.price = product.price;
          this.stockQty = product.stockQty;
          this.quantity = product.quantity;
          this.image = product.image;
          
        });
    });
  }
 
  onSubmit() {
    const updatedProduct: Product = {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
      stockQty:this.stockQty,
      quantity:this.quantity,
      image: this.image
    };
    this.api.editProduct(this.id,updatedProduct)
      .subscribe((product: any) => {
        alert("product updated successfully");
        this.product = product;
          this.id = product.id;
          this.name = product.name;
          this.description = product.description;
          this.category = product.category;
          this.price = product.price;
          this.stockQty = product.stockQty;
          this.quantity = product.quantity;
          this.image = product.image;
         
 
      });
  }

}
