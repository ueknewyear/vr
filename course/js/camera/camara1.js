document.addEventListener('plusready',function(){
	var rec = document.querySelector('.recBox');
	var recW = rec.offsetWidth , recH = rec.offsetHeight;
	var img = document.querySelector('#img');
	var canvas = document.querySelector('canvas');
	var context = canvas.getContext('2d');
    canvas.width = recW , canvas.height = recH;
 
},false)
