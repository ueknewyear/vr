$(function(){
	　var rec = $('.recBox');
	var recW = rec.innerWidth() , recH = rec.innerHeight();
	var img = $('#img');
	var canvas = $('canvas');
	var context = canvas[0].getContext('2d');
	var video = $('video')[0];
    canvas[0].width = recW , canvas[0].height = recH;
    
    
    
    var constraints = { audio: true, video: { width: recW, height: recH } }; 

	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(mediaStream) {
	  video.srcObject = mediaStream;
	  video.onloadedmetadata = function(e) {
	    video.play();
	    setInterval(function(){
	    	context.drawImage(video, 0, 0, recW, recH);
	    	var data = canvas[0].toDataURL();
	    },60)
	    
	  };
	})
	.catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
    
  /*  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia ;  
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        
     
    getMedia(); 
       
     //获取视频
        function getMedia() {
            
           if (navigator.getUserMedia) {  
                navigator.mediaDevices.getUserMedia({  
                    'video': {  
                        'optional': [{  
                            'sourceId': 0   //0为前置摄像头，1为后置  
                        }]  
                    },  
                    'audio':true  
                }, successFunc, errorFunc);    //success是获取成功的回调函数  
            }  
            else {  
                alert('该浏览器无法正常使用,请使用火狐浏览器');  
            }  
        }  
        //获取成功
        function successFunc(stream) {  
            //alert('Succeed to get media!');  
            video.src = window.URL.createObjectURL(stream);
            video.play();
            context.drawImage(video, 0, 0, recW, recH);
        }  
        //视频获取失败
        function errorFunc(e) {  
            alert('Error！'+e);  
        }   */  
})