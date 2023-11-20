import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CheckoutComponent } from './check-out/check-out.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SalesReportComponent } from './sales-report/sales-report.component';


const routes: Routes = [
  {path:'',component:HomePageComponent,canActivate:[AuthGuard]},
  {path:'product-details/:id', component:ProductDetailsComponent,canActivate:[AuthGuard]},
  {path:'cart', component:CartComponent,canActivate:[AuthGuard],data:{role:['customer','cashier']}},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponentComponent},
  {path:'editProduct/:id',component:EditProductComponent,canActivate:[AuthGuard],data:{role:['admin']}},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'wishlist',component:WishlistComponent,canActivate:[AuthGuard]},
  {path:'sales-report',component:SalesReportComponent,canActivate:[AuthGuard]},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AuthGuard],data:{role:['admin']}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
