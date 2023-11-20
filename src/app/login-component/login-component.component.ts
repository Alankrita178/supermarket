import { Component } from '@angular/core';
import { FormBuilder,FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginForm !: FormGroup;

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
    this.loginForm = this.fb.group({
      email:'',
      password:''
    })
  }

  login(){
    this.api.loginUser(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/'])
    })
  }

}
