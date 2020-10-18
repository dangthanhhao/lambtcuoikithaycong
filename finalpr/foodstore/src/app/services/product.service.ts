import { AuthService } from 'src/app/services/auth.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import {HttpHeaders,HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:Http,private httpclient:HttpClient,private auth:AuthService) { }

  getAllPosts(cate){
    if (cate==="Tất cả")
    return this.http.get("http://localhost:8080/product_all");
    
    else {
      
      return this.http.get("http://localhost:8080/product_all/"+cate);
    }
  }
  getById(id){
    return this.http.get(`http://localhost:8080/product/${id}`);
  }
  getfeedback(id){
    return this.http.get(`http://localhost:8080/feedback/${id}`);
  }
  createfeedback(value){
    let ahead= new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: ahead };
   return this.httpclient.post("http://localhost:8080/feedback",JSON.stringify(value),options);
  }
  //for admin
//upload pic

  upload(fd){
    return this.http.post("http://localhost:8080/upload",fd);
  }
  insert(product){
   return this.httpclient.post("http://localhost:8080/product",JSON.stringify(product),this.auth.getheaderhttp());
  }
  delete(id){
    return this.httpclient.delete(`http://localhost:8080/product/${id}`,this.auth.getheaderhttp());
  }
  update(product){
    return this.httpclient.put("http://localhost:8080/product",JSON.stringify(product),this.auth.getheaderhttp());
   }

   getAllFeedback(){
    return this.httpclient.get("http://localhost:8080/feedback_all",this.auth.getheaderhttp());
  }
  deleteFeedback(id){
    return this.httpclient.delete(`http://localhost:8080/feedback/${id}`,this.auth.getheaderhttp());
  }
}

