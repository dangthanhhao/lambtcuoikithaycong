import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
  products: any[];
  constructor(private service:ProductService) { }
  err=false;
  ngOnInit() {
    this.loadtable();
  }
  loadtable(){
    this.service.getAllPosts("Tất cả").subscribe(res=>{
      this.products=res.json();
      
    },err=>{this.err=true});
  }
  delete(i){
    this.service.delete(i).subscribe(res=>{alert("Xóa thành công!");this.loadtable()},err=>alert("Xóa thất bại!"));
    
  }
  
}
