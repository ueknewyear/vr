$(function(){
    var swiper1 = new Swiper('.swiper-container.my', {
        slidesPerView: 7,
        freeMode: true
    });
    $(".my > .swiper-wrapper .swiper-slide").click(function () {
        $(this).siblings().removeClass('active').end().addClass('active');
    })
   
    var colorarr = ['#69dc8a','#e8c669','#19b9f5'];
    var box=$(".box .swiper-wrapper");
    var day=['周一','周二','周三','周四','周五','周六','周日'];
    for(var i=0;i<7;i++){
        var slide=$("<div class='swiper-slide'>");
        for(var j=0;j<13;j++){
            if(j==0){
                $(`<div class="a">`).html(day[i]).appendTo(slide);
            }else{
                $(`<div class="b" id='t${i}-${j}'>`).appendTo(slide);
            }
        }
        slide.appendTo(box);
    }

    var swiper2 = new Swiper('.swiper-container.box', {
        slidesPerView: 3,
        freeMode: true
    });
    
    $('.my > .swiper-wrapper >.swiper-slide > div').on('click',function(){
    	var wid = $(this).html();
    	getData(wid);
    })
    $('.my > .swiper-wrapper >.swiper-slide.active > div').triggerHandler('click');
    function getData(wid){
	    $.ajax({
	    	type:"get",
	    	url:"/vrdatabase/shedule.php",
	    	data:{wid},
	    	dataType:'json',
	    	success:function(data){
	            $.each(data, function(index,value) {
	            	render(value)
	            });		
	    	}
	    });
    }
    function render(value){
    	var arr = value.son;
    	$.each(arr, function(index,v) {
    		var str = `#t${v.x}-${v.y}`;
    		var color =colorarr[Math.floor( Math.random()*colorarr.length)];
    	    $(str).html();
    		$(str).css('background',color).html(function(i,v){
    			return v+value.cname;
    		});
    	});
    }
    
   
    
})
