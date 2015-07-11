// JavaScript Document
$(function(){ 
	
	var oh=$('.catalog_box').height();
	$('.vertical_line').height(oh-45);

	$('.select_btn').live('click',function(){
		var box=$(this).parent().next();
		if(box.is(':hidden')){
			$(this).addClass('click');
			box.slideDown();
		}else{
			$(this).removeClass('click');
			box.slideUp();
		}	
	})
	$(document).live('click',function(){
		$('.type_list').hide();	
	})
	$('.type_box,.type_list').live('click',function(e){
		e.stopPropagation();	
	})
	
	$('.meet_table tr:even').css('background','#f2f2f2');
	$('.meet_table tr').hover(function(){
		$(this).find('.edit_box').toggle();	
	})
	$('.filter_table tr:even').css('background','#f2f2f2');
	
	$('.icon_close').click(function(){
		$('.pop_1000').hide();	
	})
})