import { Component , OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { Product } from 'src/shared/models/Product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  wishlistItems: any[] = [];
  userId: string = "";

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
        this.wishlistItems = data;
      });
  }

}
