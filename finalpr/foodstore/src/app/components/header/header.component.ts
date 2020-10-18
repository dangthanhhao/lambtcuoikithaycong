import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private auth:AuthService) { }
  
  ngOnInit() {
  }
  logout(){
    localStorage.removeItem('currentUser');
    alert("Đăng xuất thành công");
   
  }
  check():boolean{
    if (this.auth.isLogin()) {
      return true;
    }
    else return false;
  }
  checkAdmin():boolean{
    
    if  (this.auth.getUser()&&this.auth.getUser().Role){
      return true;
    }
    return false;
    
  }
}
