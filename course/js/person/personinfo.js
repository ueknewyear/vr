$(function(){
    //取消收藏弹框
	$(".icon-shoucang").click(function(){
		$(".alert").fadeIn();
//		$(this).css("color","#b2b2b2");
	})

	$(".btn").click(function(){
		$(".alert").fadeOut();
		$(".icon-shoucang").css("color","#19b9f5");
	})
})	
	// 扩展API加载完毕后调用onPlusReady回调函数 
	document.addEventListener( "plusready", onPlusReady, false );
	// 扩展API加载完毕，现在可以正常调用扩展API 
	function onPlusReady() {
	}
	// 从相册中选择图片 
	function galleryImg() {
		// 从相册中选择图片
		console.log("从相册中选择图片:");
	    plus.gallery.pick( function(path){
	    	console.log(path);
	    }, function ( e ) {
	    	console.log( "取消选择图片" );
	    }, {filter:"image"} );
	}
	// 从相册中选择多张图片 
	function galleryImgs(){
		// 从相册中选择图片
		console.log("从相册中选择多张图片:");
	    plus.gallery.pick( function(e){
	    	for(var i in e.files){
		    	console.log(e.files[i]);
	    	}
	    }, function ( e ) {
	    	console.log( "取消选择图片" );
	    },{filter:"image",multiple:true});
	}


