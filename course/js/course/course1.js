$(function(){
	var uls = $('.search > ul');
	var listBox = $('.listBox');
	var kaList = $('.kaList');
	var category = null;
	var list  = null;
	var imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
	
	mui.getJSON('/vrdatabase/category.php',function(data){
		category = data.category;
		list = data.list;
		cateHtml(category);
	    
        listHtml(listBox.last(),list.slice(4));
        kaHtml(kaList.last(),list.slice(0,4))
	})
	mui.getJSON('/vrdatabase/courseList.php?cid=1',function(data){
		/*category = data.category;
		list = data.list;
		cateHtml(category);
	    
        listHtml(listBox.last(),list.slice(4));
        kaHtml(kaList.last(),list.slice(0,4))*/
       kaHtml(kaList.first(),data.list.slice(0,2));
       listHtml(listBox.first(),list.slice(3,7))
	})
	
	
	
	
	function kaHtml(obj,listArr){
		 obj.html();
		var html = '';
		$.each(listArr, function(index,value) {
			html +=`
			<li>
        		<a href='courseDetail.html?cid=${value.id}'>
        			<h3>${value.name}</h3>
        			<h4>${value.about}</h4>
        			<h5>
        				<span>免费</span>
        				<p>+&nbsp;NEW</p>
        			</h5>
        		</a>
        	</li>
			`
		});
		
		obj.html(html);
	}
	function listHtml(obj,listArr){
        obj.html();
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
		
		obj.html(html);
	}
	
	function cateHtml(cateArr){
		uls.html();
		var html = `<li class="hot"><a href="course1.html">个性推荐</a></li>`;
		$.each(cateArr, function(index,value) {
			html +=`
			<li><a href="courseList.html?cid=${value.id}">${value.name}</a></li>
			`
		});
		uls.html(html);
	}
	
})
