import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/shared/services/api.service';
import { FormControl,FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/shared/models/Product.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  products: any[] = [];
  user:any;
  userId: string = "";
  userRole : any;
  role : any;
  searchForm: FormGroup;
  searhcedResults: Array<Product> = [];
  product: any = {};
  selectedCategory: string = 'All';
  
  constructor(private apiService: ApiService,private router:Router,private fb:FormBuilder) {
    this.searchForm = this.fb.group({
      searchInput: ''
    });

    

    this.searchForm.valueChanges.subscribe((value) => {
      // console.log(this.products);
      console.log(value.searchInput);
      
      this.searhcedResults = this.products.filter((product: Product) => {
        return product.name.toLowerCase().includes(value.searchInput.toLowerCase());
      });
      console.log(this.searhcedResults);
    });
   }

  ngOnInit(): void {
    this.getProducts();
    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.userRole = userObject.role;
    } else {
      console.log('User not found in localStorage');
    }
  }

  getProducts(){
    this.apiService.getProducts().subscribe(data =>{
      console.log(data);
      this.products = data;
      this.searhcedResults = this.products;
    })
  }

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  
    if (category === 'All') {
      this.searhcedResults = this.products; // If All is selected, show all products
    } else {
      this.searhcedResults = this.products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  

  

  logout(){
    alert("Thank you for visiting us!!")
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }



}
