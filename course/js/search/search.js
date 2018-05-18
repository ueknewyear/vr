$(function(){
	let search = $('.search');
	let arrs  = JSON.parse(localStorage.getItem('tag')) || [];
    let con = $('.cons');
    let courseBox = $('.courseBox');
    let listBox = $('.listBox');
    let imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
    	getData(arrs);
    
    
		search.on('focus',function(){
			con.css('display','block');
			courseBox.css('display','none');
		})
		$('.button').click(function(){
			$('.cons').removeClass('con');
			let val = $('.search').val().trim();
			if(val.trim() != ''){
				if(arrs.indexOf(val)==-1){
				   arrs.push(val);
				}
				localStorage.setItem('tag',JSON.stringify(arrs));
				getData(arrs);	
				getSearch(val);
			}
		})
	
	    $('.cons').on('click','.tab',function(){
	    	console.log(1);
	    	let val = $(this).text().trim();
	    	getSearch(val);
	    })
	
	
	    function getSearch(val){
	    	$.ajax({
				type:"get",
				url:"/vrdatabase/search.php",
				data:{words:val},
				dataType:'json',
				success:function(data){
					con.css('display','none');
					courseBox.css('display','block');
					if(data.length){
					  listHtml(data);						
					}else{
					  alert('暂无相关数据');
					  search.triggerHandler('focus');
					}

				}
		   });
	    }
	    
	    function listHtml(listArr){
	        listBox.html();
			var html = '';
			$.each(listArr, function(index,value) {
				html +=`
				<li class="listItem">
	              <a href="courseDetail.html?cid=${value.id}">
	                  <div class="listImg">
	                      <img src="${imgprefix+value['cover_image']}" alt="">
	                  </div>
	                  <div class="listInfo">
	                      <div class="listInfoTop">
	                          <h3>${value.name}</h3>
	                          <h3 class="listPrice">免费</h3>
	                      </div>
	                      <div class="listDesc">
	                                                     主讲人: ${value.tname}
	                      </div>
	                      <div class="tagList">
	                          <button>免费</button>
	                          <button>初级</button>
	                         
	                      </div>
	                  </div>
	              </a>
	          </li>
				`
			});
			
			listBox.html(html);
	}
	    
	    
		function getData(arrs){
			$('.son').html('')
		        arrs.length &&	arrs.filter((e,i)=>{      
				$('.son').prepend("<div class='tab'>" + e +"</div>")
					
			})
		}

	

})
