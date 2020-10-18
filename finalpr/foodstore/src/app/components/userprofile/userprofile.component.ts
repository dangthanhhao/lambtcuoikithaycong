import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm, NgModel } from '@angular/forms';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private service: UserService,private router: Router,private auth:AuthService) { 

  }
  check():boolean{
    if (this.auth.isLogin()) {
      return true;
    }
    else return false;
  }
  checkRepass=false;
  mess2="Re password";
  user;
  repass="";
  ngOnInit() {
    if(!this.check()){alert("Bạn chưa đăng nhập!"); this.router.navigate(['']) }
    this.user=this.auth.getUser();
    this.repass=this.user.Password;
  }
  submit(f:NgForm){
    
    if(f.valid){
      if(f.value.password!==f.value.repassword){
          this.mess2="Mật khẩu không khớp nhau!";
          this.checkRepass=true;
          return;
      }
      
      this.service.update(f.value).subscribe((res:any)=>{
        
        if (res.message) {
        
          alert(res.message);
          //when update succes. get new token
          localStorage.removeItem('currentUser');
          this.service.login(f.value).subscribe((res:any)=>{
        
            let username=f.value.username;    
            const token = res.token;
            if (token) {
              localStorage.setItem('currentUser', JSON.stringify({ username, token }));
              
              // localStorage.removeItem('currentUser');
                
            } else {
                alert("Mất kết nối với máy chủ")
               
            }
          },err=>alert("Mất kết nối với máy chủ"))
          
          
          this.router.navigate(['']);
          
            
        } else {
            alert('Cập nhật thất bại');
           
        }
      },err=>alert('Cập nhật thất bại'));
      
    }
    
    else  console.log("validate di");

}

}
