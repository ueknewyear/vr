$(function(){
	var nav1 = $('.nav1'),
		con = $('.con') ,   
		courseInfo = $('.guidread > p') ,
		lists = null , 
		course = null ,
		cid = location.search.substr(1).split('=')[1];
	nav1.on('click','div',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		con.eq(index).css({display:'block'}).siblings().css({display:'none'})
	})
   
	var video = $('#video')[0],
		vd = $('.vd'),
		play2 = $('.play2')[0],
	 	i  = vd.children('i')[0],
	 	control = $('.control-bar');
	
	 	var flag = true;
		//toggleplay
		vd.on('click','#video,.iconfont,.play2',function(e){
			if(e.target == video){	
				$(i).css({display:'block'});
				$(play2).removeClass('icon-bofang').addClass('icon-bofang1');
				control.css({display:'block'});
				video.pause();
			}else if(e.target == i ){
				$(this).css({display:'none'});
				control.css({display:'none'});
				video.play();
			}else if(e.target == play2){
				if(flag){
					$(i).css({display:'none'});
					video.play();
					$(this).removeClass('icon-bofang1').addClass('icon-bofang');
					flag = false;
				}else {	
					$(i).css({display:'block'});
					video.pause();
					$(this).removeClass('icon-bofang').addClass('icon-bofang1');
					flag = true;
				}	
			}	
		})
		//时间转换
		function format(s){
			 var min = parseInt(s / 60);
             min = min < 10 ? ['0',min].join('') : min;
             //计算秒
             var second = parseInt(s % 60);
             second = second < 10 ? ['0',second].join('') : second;
             return [min, ':', second].join('')
		}
		var alltime,nowtime;
		$(video).on('timeupdate',function(){
			 alltime = this.duration;
			 nowtime  = this.currentTime;
			var allt = format(alltime);
			var nowt = format(nowtime);
			$('.nowtime').text(nowt);
			$('.alltime').text(allt);
			var a = nowtime / alltime * 42 + '%';
			$('.timeline2').css({width:a});
		})

		$(video).on('ended',function(){
			$(play2).removeClass('icon-bofang').addClass('icon-bofang1');
		})
	  
	con.first().on('click','a',function(){
		video.src = this.title
		video.autoplay = true;
	})
	  
    mui.getJSON('/vrdatabase/courseDetail.php?cid='+cid,function(data){
		var str = ''
		 course = data.courseinfo;
		 lists = data.data;
		 // 课程信息
		 courseInfo.html(course['about']);
		 
		 // 设置课程列表
		$.each(lists, function(index,value) {
			if(typeof value=='object'){
				str+=`
				<div class="module">
				<div class="radius">

					<div></div>
				</div>
				<ul class="list">
					<h1 class="brief_title">
						${value['cpname']}
					</h1>
				    ${createLis(value['zi'])}
					
				</ul>
		</div>
			`;
			}
		});
	    
	    con.first().html(function(index,value){
	    	return value+str;
	    })
		
	})
	
	function createLis(obj){
		let str = '';
		$.each(obj, function(index,value) {
			str +=`<li>
						<a href="javasript:;" title="${value['video']}">${value['kname']}</a >
					</li>`
		});
		return str;
	}

		


		

	
	

})
