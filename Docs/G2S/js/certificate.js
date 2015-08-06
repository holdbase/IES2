// JavaScript Document
$(function(){ 
	$('.img_box').hover(function(){
		$(this).find('.mask_wrap').stop(true).animate({top:'-7px'},500);	
	},function(){
		$(this).find('.mask_wrap').stop(true).animate({top:'-283px'},500);	
	})

	$('.certificate_list li').hover(function(){
		$(this).find('.certificate_info p').toggle();	
	})
})