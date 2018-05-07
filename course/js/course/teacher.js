$(function(){
	let nav1=$(".nav1"),con=$(".con");
	nav1.on("click","div",function(){
		$(this).addClass("active").siblings().removeClass('active');
		let index = $(this).index();
		con.eq(index).css({display:'block'}).siblings().css({display:'none'});
	})
})
