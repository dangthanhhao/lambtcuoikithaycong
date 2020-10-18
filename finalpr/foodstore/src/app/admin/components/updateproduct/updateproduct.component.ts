import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  id;
  product;
  issubmit = false;
  selectedFile = null;
  err=true;
  constructor(private service: ProductService, private router: Router,private route:ActivatedRoute, private auth: AuthService) { }
  onFileSelected(event) {

    this.selectedFile = event.target.files[0]
  }
  ngOnInit() {
    this.route.paramMap.subscribe(param=>{
        
      this.id=param.get('id');
      this.service.getById(this.id).subscribe(res=>{
        
        this.product=res.json()[0];
        this.err=false;

        
      },err=>this.err=true);
    },err=>{console.log(err)});
}
submit(f: NgForm) {
  this.issubmit = true;
  if (f.valid) {
    if (!this.selectedFile||!this.selectedFile.name) {
      alert("Chọn hình upload để cập nhật!");
      return;
    }
    f.value.img = this.selectedFile.name;
    
    f.value.pid=this.id;
    console.log(f.value);
    this.service.update(f.value).subscribe((res: any) => {

      if (res.message) {

        alert(res.message);
        //upload img
        const fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);
        this.service.upload(fd).subscribe();
        this.router.navigate(['/admin','listproduct']);


      } else {
        alert('Không thể đăng kí. Hãy thử đăng kí bằng 1 username khác');

      }
    }, err => alert('Không thể đăng kí. Hãy thử đăng kí bằng 1 username khác'));


  }

  else console.log("validate di");
}
}
