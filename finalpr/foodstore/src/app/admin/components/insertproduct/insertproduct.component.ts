import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-insertproduct',
  templateUrl: './insertproduct.component.html',
  styleUrls: ['./insertproduct.component.css']
})
export class InsertproductComponent implements OnInit {

  constructor(private service: ProductService, private router: Router, private auth: AuthService) { }
  issubmit = false;
  selectedFile = null;
  ngOnInit() {

  }
  onFileSelected(event) {

    this.selectedFile = event.target.files[0]
  }
  submit(f: NgForm) {
    this.issubmit = true;
    if (f.valid) {
      if (!this.selectedFile||!this.selectedFile.name) {
        alert("Chọn hình upload để cập nhật!");
        return;
      }
      f.value.img = this.selectedFile.name;
      console.log(f.value);
      this.service.insert(f.value).subscribe((res: any) => {

        if (res.message) {

          alert(res.message);
          //upload img
          const fd = new FormData();
          fd.append('file', this.selectedFile, this.selectedFile.name);
          this.service.upload(fd).subscribe();
          this.router.navigate(['/admin','listproduct']);


        } else {
          alert('Không thể thêm sản phẩm');

        }
      }, err => alert('Không thể thêm sản phẩm'));


    }

    else console.log("validate di");
  }
}
