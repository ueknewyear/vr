$(function(){
    //取消收藏弹框
	$(".btn").click(function(){
		$(".alert").fadeOut();
	})
})
//document.addEventListener('plusready',function(){
document.addEventListener('DOMContentLoaded',function(){
	let load = document.querySelector('.load');
	
	let ch = document.documentElement.clientHeight;
	let listBoxs = document.querySelector('.listBoxs');
	let flag = true , allPages = 0 , newPage = 0;
	window.addEventListener('scroll',function(){
		let loadTop = load.getBoundingClientRect().top;
		if(loadTop < ch && flag){
		    flag = false;
		    getData()
		}
	});
	
	function getData(){
		mui.ajax('database/courselist.json',{
			data:{
				page:newPage
			},
			dataType:'json',
			success:function(result){
			
				let str = '';
				if(!allPages){
					allPages = result.allPages;
				}
			
				result.lists.slice(newPage*5,newPage*5+5).forEach(element=>{
					str +=`
					    <li class="listItem">
              <a href="">
                  <div class="listImg">
                      <img src=${element.thumb} alt="">
                  </div>
                  <div class="listInfo">
                      <div class="listInfoTop">
                          <h3> ${element.title}</h3>
                          <h3 class="listPrice">${element.price}</h3>
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
	
	function tagStr(str){
		let tagArr = str.trim().split(',');
		let html = '';
		tagArr.forEach(element=>{
			html+=`<button>${element}</button>`
		})
		return html;
	}
	 
},false)
