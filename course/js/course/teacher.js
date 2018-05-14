$(function(){
	/*let nav1=$(".nav1"),con=$(".con");
	nav1.on("click","div",function(){
		$(this).addClass("active").siblings().removeClass('active');
		let index = $(this).index();
		con.eq(index).css({display:'block'}).siblings().css({display:'none'});
	})*/
	var top =$('.top');
	var con = $('.con');
	var tid = location.search.substr(1).split('=')[1];
	var list = null;
	var teacher = null;
	var imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
	$.getJSON('/vrdatabase/teacherCourse.php?tid='+tid,function(data){
		 list = data.list;
		 teacher = data.teacher;
		 renderTop(teacher)
		 render(list);
	})
	
	function renderTop(teacher){
		var html = `
         <a href="javascript:;" class="logo"><img src="img/person/logo.png" alt="" /></a>
		   <div class="name">${teacher.name}</div>
		   <div class="school">
			<span>${teacher.sex}</span> /
			<span>${teacher.pname}</span>
		   </div>	
		`
		top.html(html);
	}
	
	function render(data){
		let html = '';
		con.html('');
	    $.each(data,function(index,value){
	    	html +=`
	    	<div class="listBox">
					<div class="listItem">
			              <a href="details.html?cid=${value.id}">
			                  <div class="listImg">
			                      <img src="${imgprefix+value['cover_image']}" alt="">
			                  </div>
			                  <div class="listInfo">
			                      <div class="listInfoTop">
			                          <h3> ${value.name}</h3>
			                      </div>
			                      <div class="listDesc">
                      	                          主讲人: ${teacher.name}
                                  </div>
			                      <div class="tagList">
			                          <button class="cha">查看详情</button>
			                      </div>
			                  </div>
			              </a>
			        </div>
		        </div>
	    	`;
	    })
	    
	    con.html(html);	
	}
    
})
