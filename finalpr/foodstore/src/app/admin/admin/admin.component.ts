import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit() {
    //show hide admin slider button
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
    //check jwt
    if(!this.checkAdmin()){
      alert('Bạn không có quyền vào trang này!');
      this.router.navigate(['../']);
    }
  }
  checkAdmin():boolean{
    console.log(this.auth.getUser().Role);
    if  (this.auth.getUser()&&this.auth.getUser().Role){
      return true;
    }
    return false;
    
  }
}
