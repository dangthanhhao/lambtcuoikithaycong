import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient  } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private httpclient:HttpClient, private auth:AuthService) { 


  }
  login(user){
    let ahead= new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: ahead };
   return this.httpclient.post("http://localhost:8080/login",JSON.stringify(user),options);
  }

  register(user){
    let ahead= new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: ahead };
   return this.httpclient.post("http://localhost:8080/register",JSON.stringify(user),options);
  }
  
  update(user){
    let ahead= new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: ahead };
   return this.httpclient.put("http://localhost:8080/updateProfile",JSON.stringify(user),options);

  }
//admin
  getAllUser(){
    return this.httpclient.get("http://localhost:8080/user_all",this.auth.getheaderhttp());
  }
  
  delete(id){
    return this.httpclient.delete(`http://localhost:8080/user/${id}`,this.auth.getheaderhttp());
  }
  makeAD(id){
    return this.httpclient.put("http://localhost:8080/makead",JSON.stringify({'username' :id}),this.auth.getheaderhttp());
   }
   getUserbyId(id){
    return this.httpclient.get(`http://localhost:8080/user/${id}`,this.auth.getheaderhttp());
   }
}
