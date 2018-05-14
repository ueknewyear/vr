$(function(){
	var uls = $('.search > ul');
	var listBox = $('.listBox');
	var category = null;
	var list  = null;
	var imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
	mui.getJSON('/vrdatabase/category.php',function(data){
		category = data.category;
		list = data.list;
		cateHtml(category);
	    
        listHtml(list.slice(0,4));
        
	})
	function listHtml(listArr){
		var lists = $(listBox[0]);
		lists.html();
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

                      <div class="tagList">
                          <button>免费</button>
                          <button>初级</button>
                          <button>27课时</button>
                      </div>
                  </div>
              </a>
          </li>
			`
		});
		
		listBox.html(html);
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
