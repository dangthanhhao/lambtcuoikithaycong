import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  constructor(private service: UserService, private router: Router,private route:ActivatedRoute, private auth: AuthService) { }
  id;
  user;
  err=true;
  checkRepass=false;
  mess2="Re password";
  
  repass="";
  ngOnInit() {
    this.route.paramMap.subscribe(param=>{
        
      this.id=param.get('id');
      
      this.service.getUserbyId(this.id).subscribe(res=>{
        
        this.user=res[0];
        this.repass=this.user.Password;
        console.log(this.repass);
        this.err=false;

        
      },err=>{this.err=true;console.log(err)});
    },err=>{console.log(err)});
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
          
          
          this.router.navigate(['']);
          
            
        } else {
            alert('Cập nhật thất bại');
           
        }
      },err=>alert('Cập nhật thất bại'));
      
    }
    
    else  console.log("validate di");

}
}
