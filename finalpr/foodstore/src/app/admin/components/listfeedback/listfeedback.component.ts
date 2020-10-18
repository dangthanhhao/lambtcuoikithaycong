import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listfeedback',
  templateUrl: './listfeedback.component.html',
  styleUrls: ['./listfeedback.component.css']
})
export class ListfeedbackComponent implements OnInit {
  feedbacks;
  err=false;
  constructor(private service:ProductService) { }
  ngOnInit() {
    this.loadtable();
  }
  loadtable(){
    this.service.getAllFeedback().subscribe(res=>{
      console.log(res);
      this.feedbacks=res;
      
    },err=>{console.log(err); err=true; alert("Lỗi")});
  }
  delete(i){
    this.service.deleteFeedback(i).subscribe(res=>{alert("Xóa thành công!");this.loadtable()},err=>alert("Xóa thất bại!"));
    this.loadtable();
  }

}
