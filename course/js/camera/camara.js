document.addEventListener('plusready',function(){
	var rec = document.querySelector('.recBox');
	var recW = rec.offsetWidth , recH = rec.offsetHeight;
	var img = document.querySelector('#img');
	var canvas = document.querySelector('canvas');
	var context = canvas.getContext('2d');
    canvas.width = recW , canvas.height = recH;
    var imgbase = canvas.toDataURL("image/jpeg");
//  var video = document.querySelector('#video');
	
    var cmr = plus.camera.getCamera();

    /*cmr.captureImage(function (p){
        plus.io.resolveLocalFileSystemURL(p, function(entry){
            img.src = entry.toLocalURL()  ;
            img.onload = function(){
            	context.drawImage(img,0,0);
            	var imgbase1 = canvas.toDataURL("image/jpeg");
            	console.log(imgbase1);
            }
        }, function(e){
        	 console.log(e.message);
        });
    }, function(e){},{index:1,filename:"_doc/camera/"});*/
	cmr.startVideoCapture(function(p){
		plus.io.resolveLocalFileSystemURL(p, function(entry){
		   console.log( entry );
		}, function(e){
			console.log(e.message);
		} );
	}, function(e){
		outLine('失败：'+e.message);
	}, {filename:'_doc/camera/',index:1});
},false)
