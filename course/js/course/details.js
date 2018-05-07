$(function(){
	let nav1 = $('.nav1'),
		con = $('.con');

	nav1.on('click','div',function(){
		$(this).addClass('active').siblings().removeClass('active');
		let index = $(this).index();
		con.eq(index).css({display:'block'}).siblings().css({display:'none'})
	})

	let video = $('#video')[0],
		vd = $('.vd'),
		play2 = $('.play2')[0],
	 	i  = vd.children('i')[0],
	 	control = $('.control-bar');
	
	 	let flag = true;
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
			 let min = parseInt(s / 60);
             min = min < 10 ? ['0',min].join('') : min;
             //计算秒
             let second = parseInt(s % 60);
             second = second < 10 ? ['0',second].join('') : second;
             return [min, ':', second].join('')
		}
		let alltime,nowtime;
		$(video).on('timeupdate',function(){
			 alltime = this.duration;
			 nowtime  = this.currentTime;
			let allt = format(alltime);
			let nowt = format(nowtime);
			$('.nowtime').text(nowt);
			$('.alltime').text(allt);
			let a = nowtime / alltime * 42 + '%';
			$('.timeline2').css({width:a});
		})

		$(video).on('ended',function(){
			$(play2).removeClass('icon-bofang').addClass('icon-bofang1');
		})
		$('.button').on('touchstart',function(e){
			console.log(e.clientX);
			$('.button').on('touchmove',function(e){
					console.log(e);
                	$(this).css({left:e.clientX});
                    //控制细线的left值
                    //当前鼠标移动的时间
                   label_time = format(alltime * e.clientX / e.currentTarget.offsetWidth);
                   $('.label').text(label_time);
			})
					
              
		})


		


		

	
	

})
