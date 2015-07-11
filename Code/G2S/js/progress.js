// JavaScript Document
$(function(){ 
	
	//进度详情-自动督促
	
	$('.auto_box').hover(function(){
		$(this).find('a').css('border-color','#797979');
		$('.ducu_box').show();	
	},function(){
		$(this).find('a').css('border-color','#fff');
		$('.ducu_box').hide();	
	})
	
	//资料使用情况
	$('.resource_tit i').live('click',function(){
		if(!$(this).hasClass('click')){
			$(this).addClass('click');
			$(this).css('background-position','-32px -16px');
			$(this).parent().next().slideUp();
		}else{
			$(this).removeClass('click');
			$(this).css('background-position','-32px 0');
			$(this).parent().next().slideDown();
		}	
	})
	
	$('.data_status i').live('click',function(){
		if(!$(this).hasClass('flag2')){
			$(this).addClass('flag2');
		}else{
			$(this).removeClass('flag2');
		}		
	})
	
	$('.resource_list').each(function(){
		$(this).find('.resource_detail:odd').css('background','#f6f6f6');
	})
	
})