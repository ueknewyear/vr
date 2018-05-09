$(function(){
	var con = $('.con');
	var start = $('.start');
	var cid = location.search.substr(1).split('=')[1];
	var lists = null;
	var course = null;
	start.attr('href',function(index,value){
		return  value + '?cid=' + cid;
	});
	mui.getJSON('http://localhost/vrdatabase/courseDetail.php',function(data){
		var str = ''
		 course = data.courseinfo;
		 lists = data.data;
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
	
})
