// JavaScript Document
$(function(){ 
	//关闭弹出层
	$('.icon_close').click(function(){
		$('.pop_bg,.pop_600,.pop_400,.pop_800,.pop_1000').hide();	
	})
	
	//弹出层方法
	function tanchu(popbox){
		var oHeight = $(document).height();
		var oScroll = $(window).scrollTop();
		$('.pop_bg').show().css('height',oHeight);
		popbox.show().css('top',oScroll+200);
	}
	
	$('.survey_nav_list li').live('click',function(){
		$(this).addClass('active').siblings().removeClass('active');	
	})
	
	$('.operation_btn').hover(function(){
		$(this).find('ul').toggle();	
	})
	//教学调查-问卷调查
	$(function(){ 
		var s_index = 0;
		$('.question_num').each(function(){
			$(this).find('li').live('click',function(){
				var num = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
				$(this).parents('.num_box').next().find('.question_list').eq(num).show().siblings('.question_list').hide();	
				s_index = num;
			})
		})
		$('.right_btn').live('click',function(){
			var box = $(this).siblings('.num_box');
			var boxW = box.width();
			var s_index = box.find('.active').index();
			var liW = box.find('li:first').outerWidth(true); 
			var shownum = Math.floor(boxW/liW);
			var len = box.find('li').length;
			s_index++; 
			if(len<=shownum){
				if(s_index>len-1){
					s_index = 0;
				}
			}else{
				if(s_index < shownum - 1){
					box.find('li').eq(s_index).addClass('active').siblings().removeClass('active');
				}else if(s_index<len){
					box.find('ul').css('left',(shownum - (s_index+1))*liW);
				}else{
					s_index = 0;
					box.find('ul').css('left',0);
				}
			}
			box.find('li').eq(s_index).addClass('active').siblings().removeClass('active');
			box.next().find('.question_list').eq(s_index).show().siblings().hide();			
		})
		$('.left_btn').live('click',function(){
			var box = $(this).siblings('.num_box');
			var boxW = box.width();
			var s_index = box.find('.active').index();
			var liW = box.find('li:first').outerWidth(true); 
			var shownum = Math.floor(boxW/liW);
			var len = box.find('li').length;
			s_index--;
			if(len<=shownum){
				if(s_index<0){
					s_index = len-1;
				}
			}else{
				if(s_index < 0){
					s_index = len-1;
					box.find('ul').css('left',(shownum - len)*liW);
				}else if(s_index<shownum-1){
					box.find('li').eq(s_index).addClass('active').siblings().removeClass('active');
				}else{
					box.find('ul').css('left',(shownum - (s_index+1))*liW);
				}
			}
			box.find('li').eq(s_index).addClass('active').siblings().removeClass('active');
			box.next().find('.question_list').eq(s_index).show().siblings().hide();		
		})		
	
	})
	
	//问卷调查状态暂停/开始切换
	$('.pause_btn').live('click',function(){
		if(!$(this).hasClass('start_btn')){
			$(this).addClass('start_btn');
		}else{
			$(this).removeClass('start_btn');
		}	
	})
	//问卷调查内容展开收起
	//$('.fold_btn').live('click',function(){
	//	if($(this).parents('.survey_item').next().is(':hidden')){
	//		$(this).css('background-position','-64px -32px');
	//		$(this).parents('.survey_item').next().slideDown();
	//	}else{
	//		$(this).css('background-position','-64px -16px');
	//		$(this).parents('.survey_item').next().slideUp();
	//	}	
	//})
	//选择参与对象
	$('.involve_box p a').live('click',function(){
		tanchu($('.pop_800'));	
	})
	
	
	
	
	
	//创建问卷调查-添加对象
	$('.all_grade i').bind('click',function(){
		if($(this).parent().next().is(':hidden')){
			$(this).css('background-position','-48px 0');
			$(this).parent().next().slideDown();
		}else{
			$(this).css('background-position','-48px -16px');
			$(this).parent().next().slideUp();
		}
	})
	$('.all_grade input').bind('click',function(){
		if($(this).is(':checked')){
			$(this).parent().next().find('input').attr('checked','checked');
		}else{
			$(this).parent().next().find('input').removeAttr('checked');
		}
	})
	
	//添加题型
	$('.type_box li').bind('click',function(){
		var num = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.add_box').find('.topic_box').eq(num).show().siblings('.topic_box').hide();	
	})
	
	
	//问题切换
	$(function () {
		var _index = 0;
		$('.num_list').each(function(){
		    $(this).find('li').live('click', function () {
				var num = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
				$(this).parents('.subject_num').next().find('.subject_list').eq(num).show().siblings('.subject_list').hide();	
				_index = num;
			})
		})
		 
		$('.icon_right').live('click',function(){
			var box = $(this).siblings('.subject_num');
			var boxW = box.width();
			var _index = box.find('.active').index();
			var liW = box.find('li:first').outerWidth(true); 
			var shownum = Math.ceil(boxW/liW);
			var len = box.find('li').length;
			_index++; 
			if(len<=shownum){
				if(_index>len-1){
					_index = 0;
					//box.find('ul').css('left',0);
				}
			}else{
				if(_index < shownum - 1){
					box.find('li').eq(_index).addClass('active').siblings().removeClass('active');
				}else if(_index<len){
					box.find('ul').css('left',(shownum - (_index+1))*liW);
				}else{
					_index = 0;
					box.find('ul').css('left',0);
				}
			}
			box.find('li').eq(_index).addClass('active').siblings().removeClass('active');
			box.next().find('.subject_list').eq(_index).show().siblings().hide();			
		})
		$('.icon_left').live('click',function(){
			var box = $(this).siblings('.subject_num');
			var boxW = box.width();
			var _index = box.find('.active').index();
			var liW = box.find('li:first').outerWidth(true); 
			var shownum = Math.ceil(boxW/liW);
			var len = box.find('li').length;
			_index--;
			if(len<=shownum){
				if(_index<0){
					_index = len-1;
				}
			}else{
				if(_index < 0){
					_index = len-1;
					box.find('ul').css('left',(shownum - len)*liW);
				}else if(_index<shownum-1){
					box.find('li').eq(_index).addClass('active').siblings().removeClass('active');
				}else{
					box.find('ul').css('left',(shownum - (_index+1))*liW);
				}
			}
			box.find('li').eq(_index).addClass('active').siblings().removeClass('active');
			box.next().find('.subject_list').eq(_index).show().siblings().hide();		
		})		
	})
	
	//创建教学评价-删除选中对象
	$('.select_list li i').live('click',function(){
		$(this).parent().remove();	
	})

	$('.vertical_line').each(function(){
		var ulH = $(this).siblings('ul').outerHeight(true);
		var liH = $(this).siblings('ul').children('li:last').outerHeight(true);
		$(this).height(ulH-liH+15);	
	})
	
	
	$('.explaination_box').hover(function(){
		$(this).find('.rate_detail').toggle();	
	})
})