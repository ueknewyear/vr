$(function(){
    //取消收藏弹框
	$(".btn").click(function(){
		$(".alert").fadeOut();
	})
})
//document.addEventListener('plusready',function(){
document.addEventListener('DOMContentLoaded',function(){
	let load = document.querySelector('.load');
	let camera = document.querySelector('.camera');
	let ch = document.documentElement.clientHeight;
	let listBoxs = document.querySelector('.listBoxs');
	let flag = true , allPages = 0 , newPage = 0;
	getData();
	window.addEventListener('scroll',function(){
		let loadTop = load.getBoundingClientRect().top;
		if(loadTop < ch && flag){
		    flag = false;
		    getData()
		}
	});
	
	/*camera.addEventListener('touchend',function(){
		
		
	},false)
	*/
	
	function getData(){
		mui.ajax('http://localhost/vrdatabase/course.php',{
			data:{
				page:newPage
			},
			dataType:'json',
			success:function(result){
			    console.log(result);
				let str = '';
				if(!allPages){
					allPages = result.allPages;
				}
			
				result.lists.forEach(element=>{
					str +=`
					    <li class="listItem">
              <a href="courseDetail.html?cid=${element.id}">
                  <div class="listImg">
                      <img src=${element['cover_img']} alt="">
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
				listBoxs.innerHTML += str;
                newPage++;
                if(newPage < allPages){
                	flag = true;
                }else{
                	flag = false;
                	let load = document.querySelector('.load');
                	load.style.display = 'none';
                	$(".alert").fadeIn();
                }
			}
		})
		
	}
	
	function tagStr(str='免费,初级'){
		let tagArr = str.trim().split(',');
		let html = '';
		tagArr.forEach(element=>{
			html+=`<button>${element}</button>`
		})
		return html;
	}
	
	
	 
},false)
