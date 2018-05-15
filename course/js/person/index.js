$(function(){
	var listBox = $('.listBox');
	var top =$('.top');
	var course = null;
	var student = null;
	var imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
	$.ajax({
		url:'/vrdatabase/collection.php',
		dataType:'json',
		success:function(data){
			course = data.course;
			student = data.student;
			renderTop(student)
		    render(course);
		}
	})
	
	listBox.on('click','.iconfont.icon-shoucang',function(){
		$(this).toggleClass('active');
		var cid = $(this).attr('id');
		var flag = $(this).hasClass('active');
		var text = flag ? '取消收藏' :'收藏成功'; 
		$(".alert").fadeIn().children('h3').html(text);
		
		$.ajax({
			url:'/vrdatabase/togglecollection.php',
			data:{cid:cid,flag:flag},
			success:function(){

			}
			
		})
	})
	$(".btn").click(function(){
		$(".alert").fadeOut();
	})
	function renderTop(teacher){
		var html = `
         <a href="javascript:;" class="logo"><img src="img/person/logo.png" alt="" /></a>
		   <div class="name">${teacher.name}</div>
		   <div class="school">
			山西农业大学
		   </div>	
		<a href="personInfo.html" class="edits"><img src="img/person/edit.png" alt="" class="edit" /></a>
		   
		`
		top.html(html);
	}
	
	function render(data){
		let html = '';
		listBox.html('');
	    $.each(data,function(index,value){
	    	html +=`
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
			                                                   主讲人: ${value.tname}
                                  </div>
			                      <div class="tagList">
			                          <button class="cha">查看详情</button>
			                      </div>
			                  </div>
			              </a> 
			              <div class="iconfont icon-shoucang" id="${value.id}"></div>
			        </div>
	    	`;
	    })
	    
	    listBox.html(html);	
	}
    
})
