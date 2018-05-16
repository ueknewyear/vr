$(function(){
    var uls = $('.search > ul');
	var listBox = $('.listBox');
	var category = null;
	var list  = null;
	var imgprefix = 'http://59.110.154.79:8080/ssm/resourse/uploadCourseCoverImage/';
	var cid = location.search.substr(1).split('=')[1];
	
	$.ajax({
		url:'/vrdatabase/courseList.php?cid='+cid,
	    dataType:'json',
	    success:function(data){
	    	category = data.category;
	    	list = data.list;
	    	cateHtml(category);
	    	listHtml(list)
	    }
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
	
	function cateHtml(cateArr){
		uls.html();
		var html = `<li><a href="course1.html">个性推荐</a></li>`;
		$.each(cateArr, function(index,value) {
			if(value.id == cid){
				html +=`
			<li class='hot'><a href="courseList.html?cid=${value.id}">${value.name}</a></li>
			`
			}else{
				html +=`
			<li><a href="courseList.html?cid=${value.id}">${value.name}</a></li>
			`
			}
			
		});
	
		uls.html(html);
	}
})
