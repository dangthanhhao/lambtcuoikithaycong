import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
    users;
  constructor(private service:UserService) { }
  err=false;
  ngOnInit() {
    this.loadtable();
  }
  loadtable(){
    this.service.getAllUser().subscribe(res=>{
      this.users=res;
      
    },err=>{this.err=true});
  }
  delete(i){
    this.service.delete(i).subscribe(res=>{alert("Xóa thành công!");this.loadtable()},err=>alert("Xóa thất bại!"));
    
  }
  setad(i){
    console.log();
    this.service.makeAD(i).subscribe(res=>{alert("Cập nhật thành công");this.loadtable()},err=>alert("Cập nhật thất bại!"));
  }
}
