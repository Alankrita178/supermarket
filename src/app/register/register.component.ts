import { Component } from '@angular/core';
import { FormBuilder,FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm !: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService){
    this.registerForm = this.fb.group({
      name: '',
      email: '',
      password: '',
      role: '',
      phone: '',
      cart: this.fb.array([])
    });
  }

  register(){
    this.api.registerUser(this.registerForm.value).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      alert("registered successfully!")
    })
  }

}
