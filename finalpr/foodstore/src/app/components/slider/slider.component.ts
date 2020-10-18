import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  
  constructor(private router: Router) { }
  
  ngOnInit() {
    
    this.showHideSlider();
  }

  showHideSlider(){
    let awidth= $('.leftslide').width;
      
    $('.leftslide').toggle(function(){
        $('.leftslide').animate({width:0});
        
    },function(){
        $('.leftslide').animate({width:awidth});
        
    });

  }
  
}
