import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import { NgForm, NgModel } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  mess="Username";
  issubmit=false;
  constructor(private service: UserService,private router: Router,private auth:AuthService) { }
  
  ngOnInit() {
    if(this.check()){alert("Bạn đã đăng nhập rồi!"); this.router.navigate(['']) }
  }
  check():boolean{
    
    if (this.auth.isLogin()) {
      return true;
    }
    else return false;
  }
  submit(f:NgForm){
    this.issubmit=true;
    if(f.valid){
      
      this.service.login(f.value).subscribe((res:any)=>{
        
        let username=f.value.username;    
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username, token }));
          alert(res.message);
          this.router.navigate(['']);
          // localStorage.removeItem('currentUser');
            
        } else {
            this.mess='Sai tài khoản hoặc mật khẩu';
           
        }
      },err=>this.mess='Sai tài khoản hoặc mật khẩu')
      
    }
    
    else  console.log("validate di");
  }
}
