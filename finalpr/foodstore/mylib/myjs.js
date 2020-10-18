let awidth= $('.leftslide').width;
function myf(){
    $('.leftslide').toggle(function(){
        $('.leftslide').animate({width:0});
        
    },function(){
        $('.leftslide').animate({width:awidth});
        
    });
}
$('.leftslide').toggle(function(){
    $('.leftslide').animate({width:0});
    
},function(){
    $('.leftslide').animate({width:awidth});
    
});
