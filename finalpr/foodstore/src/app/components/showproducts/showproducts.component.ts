import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
allproducts:any[];
products: any[];
numerofRow=0;
rows: number[];
columns:number[]=[0,1,2,3];
cate='Tất cả';
pagi;
err=true;
pagintion=1;
page=0;
paginations:number[];
  constructor(private route:ActivatedRoute,private service:ProductService) {
   
   }
  
   
  ngOnInit() {
    
    this.route.paramMap.subscribe(param=>{
      
        this.cate=param.get('cate');
        if (!this.cate) this.cate="Tất cả";

        this.service.getAllPosts(this.cate).subscribe(res=>{
          this.allproducts=res.json();
        
          this.getproducts();
          
          if(!this.products||this.products.length===0) this.err=true;
          else{
          //calculate number of riow  
          this.numerofRow=this.products.length/4;
          
          let index=0;
            for (; index < this.numerofRow+1; index++) {
          }
          this.rows = Array(index-1).fill(3).map((x,i)=>i);
          //callculate number of pagination
          this.pagintion=this.allproducts.length/12; //20 product on a page
          index=0;
          for (; index < this.pagintion+1; index++) {
          }
          this.paginations = Array(index-1).fill(3).map((x,i)=>i+1);
          this.err=false;
          
          }
      },err=>{this.err=true});
    });
     

   
  }
  changepage(){
    this.getproducts(); 
  }
  getproducts(){
    this.products=[];
    for (let index = 0; index < 12; index++) {
     if(index+ this.page*12<this.allproducts.length)
      this.products.push(this.allproducts[index+ this.page*12]);
    }
    
  }
  getId(r,c){
    
    return this.products[r*4+c].Id;
  }


}
