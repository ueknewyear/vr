$(function(){
	var con = $('.con');
	var start = $('.start');
	var cid = location.search.substr(1).split('=')[1];
	var imga = $('.imga > img');
	var courseInfo = $('.guidread > p');
	var himg = $('.himg');
	var lists = null;
	var course = null;
	var imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
	start.attr('href',function(index,value){
		return  value + '?cid=' + cid;
	});
	
	
	mui.getJSON('/vrdatabase/courseDetail.php?cid='+cid,function(data){
		var str = ''
	
		 course = data.courseinfo;
		 lists = data.data;
		 // 课程信息
		 imga.attr('src',imgprefix+course['cover_image']);
		 courseInfo.html(course['about']);
		 
		 setCourseInfo(course);
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
	    
	    con.html(function(index,value){
	    	return value+str;
	    })
		
	})
	
	function createLis(obj){
		let str = '';
		$.each(obj, function(index,value) {
			str +=`<li>
						<a href="javasript:;">${value['kname']}</a >
					</li>`
		});
		return str;
	}
	function setCourseInfo(course){
		var str = `<img src="img/course/headerimg.png" alt="" class="bgimg">
			<div class="names">
				<div class="teacher">${course.name}</div>
				<span>金牌讲师</span>
			</div>
			<i class="iconfont icon-gengduo"></i>
			<div class="headerimg">
				<img src="${imgprefix+course['photo']}" alt="">
			</div>`;
		himg.attr('href','teacher.html?tid='+course.tid)	
		himg.html(str);	
	}
})
