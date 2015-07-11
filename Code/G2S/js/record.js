// JavaScript Document	
$(function(){ 
	
	
	//弹出层方法
	function tanchu(popbox){
		var oHeight = $(document).height();
		var oScroll = $(window).scrollTop();
		$('.pop_bg').show().css('height',oHeight);
		popbox.show().css('top',oScroll+200);
	}

	//成绩表格宽度和隔行变色
	$('.score_table').each(function(){
		var columns = $(this).find('tr:eq(2)').find('td').length;
		$(this).find('tr:even').css('background','#f2f2f2');
		$(this).width((columns-1)*69+94+columns+1);	
	})
	
	//成绩管理鼠标移入出现图标
	$('.score_name').hover(function(){
		$(this).find('i').toggle();
	})
	
	//成绩管理表格
	$('.management_table').each(function(){
		$(this).find('tr:odd').css('background','#f2f2f2');	
	})
	
	$('.stu_table').each(function(){
		$(this).find('tr:even').css('background','#f2f2f2');	
	})
	
	$('.weight_table').each(function(){
		$(this).find('tr:even').css('background','#e4e4e4');	
	})
	
})	


