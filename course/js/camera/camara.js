document.addEventListener('plusready',function(){
	var recBox = document.querySelector('.recBox');
	var recW = rec.offsetWidth , recH = rec.offsetHeight;
	var canvas = document.querySelector('canvas');
	canvas.width = recW+'px' , canvas.Height = recH+'px';
	/*var cmr = plus.camera.getCamera();
	cmr.startVideoCapture(function(p){
		outLine('成功：'+p);
		plus.io.resolveLocalFileSystemURL(p, function(entry){
			createItem(entry);
		}, function(e){
			outLine('读取录像文件错误：'+e.message);
		} );
	}, function(e){
		outLine('失败：'+e.message);
	}, {filename:'_doc/camera/',index:i});*/
	
	
},false)
