import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  totalPrice = 0;
  discount = 0;
  

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      apartmentNo: ['', Validators.required],
      area: ['', Validators.required],
      pincode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      addressType: ['', Validators.required],
      discount: ['NONE']
    });
    
  }

  onSubmit() {
    const formData = this.checkoutForm.value;
    console.log(this.checkoutForm.value)
    localStorage.setItem('checkoutData', JSON.stringify(formData));
    const totalPriceJson = localStorage.getItem('totalPrice');
    if (totalPriceJson !== null) {
      this.totalPrice = JSON.parse(totalPriceJson);
      const discountType = this.checkoutForm.get('discount')?.value;
      this.applyDiscount(discountType);
      this.razorPayPopUp(this.totalPrice);
    } else {
      console.log('Total price not found in local storage');
    }
  }

  applyDiscount(discountType: string) {
    const totalPriceJson = localStorage.getItem('totalPrice');
    if (totalPriceJson !== null) {
      let totalPrice = JSON.parse(totalPriceJson);
      if (totalPrice >= 500) {
        this.discount = 50;
        totalPrice -= this.discount;
        this.checkoutForm.patchValue({ discount: 'GIFTCARD' });
      } else if (totalPrice >= 300) {
        this.discount = totalPrice * 0.2;
        totalPrice -= this.discount;
        this.checkoutForm.patchValue({ discount: '20OFF' });
      } else if (totalPrice >= 100) {
        this.discount = totalPrice * 0.1;
        totalPrice -= this.discount;
        this.checkoutForm.patchValue({ discount: '10OFF' });
      }
      this.totalPrice = totalPrice;
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    } else {
      console.log('Total price not found in local storage');
    }
  }


  razorPayPopUp(amount: number): void {
    const options = {
      key: 'rzp_test_vKaoNtGrY0ktH5',
      amount: amount * 100,
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: '',
      handler: (response: any) => {
        alert('Payment Successfully Made! Thank You for Shopping with us:)');
        window.location.href = 'index.html';
      },
      prefill: {
        "name": "Gaurav Kumar",
 
        "email": "gaurav.kumar@example.com",
 
        "contact": "9000090000"  
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        color: '#3399cc'
      }
    };
    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response: any) => {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  }

  generateReceipt() {
    const dialogRef = this.dialog.open(ReceiptDialogComponent, {
      width: '600px',
      data: {
        totalPrice: this.totalPrice,
        discount: this.discount,
        cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(){
    alert("Thank you for visiting us!!")
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }
  }
