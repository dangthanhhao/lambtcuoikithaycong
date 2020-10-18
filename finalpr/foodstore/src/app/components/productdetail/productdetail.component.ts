import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:ProductService,private auth:AuthService) { }
  pid;
  err=true;
  product;
  havefeedback=false
  feedbacks:any[];
  user;
  issubmit=false;
  check():boolean{
    if (this.auth.isLogin()) {
      return true;
    }
    else return false;
  }
  ngOnInit() {
    
    this.route.paramMap.subscribe(param=>{
      
      this.pid=param.get('id');
      this.user=this.auth.getUser();
      
      this.service.getById(this.pid).subscribe(res=>{

        this.product=res.json()[0];
        if(!this.product) this.err=true;
        else{
             this.err=false;
             this.loadFeedback();
        }
    },err=>{this.err=true});
  });
   
  }
  loadFeedback(){
    this.service.getfeedback(this.pid).subscribe(resf=>{
      this.feedbacks=resf.json();
      
       if (this.feedbacks.length===0) {
         this.havefeedback=false;
       }
       else{
         this.havefeedback=true;
       }
      },errf=>{this.havefeedback=false});
  }
  submit(f:NgForm){
    this.issubmit=true;
    if(f.valid){
      if(!this.check()){alert("Bạn chưa đăng nhập!"); return; }
      
      f.value.username=this.user.Username;
      f.value.pid=this.pid;
      
      
      this.service.createfeedback(f.value).subscribe((res:any)=>{
        
        if (res.message) {
        
          alert(res.message);
          this.loadFeedback();
          
            
        } else {
            alert('Không thể bình luận!');
           
        }
      },err=>alert('Không thể bình luận!'));
      
    }
    
  }

}
