import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import { NgForm, NgModel } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  issubmit=false;
  checkRepass=false;
  mess2="Re password";
  constructor(private service: UserService,private router: Router,private auth:AuthService) { }

  ngOnInit() {
    if(this.check()){alert("Bạn đã đăng nhập rồi, hãy đăng xuất để đăng kí tài khoản khác!"); this.router.navigate(['']) }
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

      if(f.value.password!==f.value.repassword){
          this.mess2="Mật khẩu không khớp nhau!";
          this.checkRepass=true;
          return;
      }
      
      this.service.register(f.value).subscribe((res:any)=>{
        
        if (res.message) {
        
          alert(res.message);
          this.router.navigate(['']);
          // localStorage.removeItem('currentUser');
            
        } else {
            alert('Không thể đăng kí. Hãy thử đăng kí bằng 1 username khác');
           
        }
      },err=>alert('Không thể đăng kí. Hãy thử đăng kí bằng 1 username khác'));
      
    }
    
    else  console.log("validate di");
  }
}
