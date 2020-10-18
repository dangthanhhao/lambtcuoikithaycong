import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLogin(){
    return localStorage.getItem('currentUser');
  }
  getUser(){
    let value=this.isLogin();
    if(!value) return null;

    let jwtHelper= new JwtHelper();
    let token=JSON.parse(value ).token;
    if(jwtHelper.isTokenExpired(token)) return null;
    return jwtHelper.decodeToken(token);
  }
  gettokken(){
    let value=this.isLogin();
    if(!value) return null;
    return JSON.parse(value ).token;
  }
  getheaderhttp(){
    let ahead= new HttpHeaders({'Content-Type':'application/json', 'authorization': `Bearer ${this.gettokken()}`});
    
    let options = { headers: ahead };
    
    return options;
  }
}
