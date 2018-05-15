$(function(){
	let search = $('.search');
	let arrs  = JSON.parse(localStorage.getItem('tag')) || [];

	$('.button').click(function(){
		$('.cons').removeClass('con');
		let val = $('.search').val();
		if(val.trim() != ''){
			arrs.push(val);
			localStorage.setItem('tag',JSON.stringify(arrs));
			getData(arrs);	
		}
	
	})
	
		function getData(arrs){
			$('.son').html('')
		arrs.length &&	arrs.filter((e,i)=>{
                
				$('.son').prepend("<div class='tab'>" + e +"</div>")
					
			})
		}

	

})
