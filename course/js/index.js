$(function(){
    //取消收藏弹框
	$(".alert").click(function(){
		$(".alert").fadeOut();
	})

	var load = $('.load')[0];
	var camera = $('.camera');
	var ch = document.documentElement.clientHeight;
	var listBoxs =$('.listBoxs');
	var baseBox = $('.baseBox');
	var imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
	var flag = true , allPages = 0 , newPage = 0;
	
	$(window).on('scroll',function(){
		var loadTop = load.getBoundingClientRect().top;
		if(loadTop < ch && flag){
		    flag = false;
		    getData()
		}
	});
	$(window).triggerHandler('scroll');
	
	$.ajax({
		url:'/vrdatabase/coursofCategory.php',
		data:{caid:1},
		dataType:'json',
		success:function(result){
			baseBox.html('');
			var str = '';
		 result.slice(0,3).forEach(element=>{
					str +=`
					    <li class="listItem">
              <a href="courseDetail.html?cid=${element.id}">
                  <div class="listImg">
                      <img src=${imgprefix+element['cover_image']} alt="">
                  </div>
                  <div class="listInfo">
                      <div class="listInfoTop">
                          <h3> ${element['name']}</h3>
                          
                          <h3 class="listPrice">免费</h3>
                      </div>
                      <div class="listDesc">
                      	 主讲人: ${element.tname}
                      </div>
                      <div class="tagList">
                          ${tagStr(element.tag)}
                      </div>
                  </div>
              </a>
          </li>
					`;
				})
				
				baseBox.html(function(index,value){
					return value+str;
				})
		}
	})
	
	
	
	function getData(){
		mui.ajax('/vrdatabase/course.php',{
			data:{
				page:newPage
			},
			dataType:'json',
			success:function(result){
				var str = '';
				if(!allPages){
					allPages = result.allPages;
				}
			
				result.lists.forEach(element=>{
					str +=`
					    <li class="listItem">
              <a href="courseDetail.html?cid=${element.id}">
                  <div class="listImg">
                      <img src=${imgprefix+element['cover_image']} alt="">
                  </div>
                  <div class="listInfo">
                      <div class="listInfoTop">
                          <h3> ${element['name']}</h3>
                          
                          <h3 class="listPrice">免费</h3>
                      </div>
                      <div class="listDesc">
                      	 ${element.about}
                      </div>
                      <div class="tagList">
                          ${tagStr(element.tag)}
                      </div>
                  </div>
              </a>
          </li>
					`;
				})
				
				listBoxs.html(function(index,value){
					return value+str;
				})
                newPage++;
                if(newPage < allPages){
                	flag = true;
                }else{
                	flag = false;
                	var load = $('.load')[0];
                	load.style.display = 'none';
                	$(".alert").fadeIn();
                }
			}
		})
		
	}
	
	function tagStr(str='免费,初级'){
		var tagArr = str.trim().split(',');
		var html = '';
		tagArr.forEach(element=>{
			html+=`<button>${element}</button>`
		})
		return html;
	}
	
	
	 
})