var set_design = function(w, h) {
	var sw = document.documentElement.clientWidth;
	var sh = document.documentElement.clientHeight;
	var designW = w;
	var designH = h;
	var scale = sh / parseInt(designH);
	return {
		dw: designW, //设计宽度
		dh: designH, //设计高度
		scale: scale, //适配后的scale
		sw: sw, //屏幕宽度
		sh: sh //屏幕高度
	};
};
var s_mes = set_design(750, 1336);
var initScene = function(scene,orient) {	
	var scene_obj = $(scene);
	var child_list = scene_obj.find(".resize_child");
	scene_obj.show();
	var resize_element = function(el) {
		var x = parseFloat(el.css("left"));
		var fix_width = el.hasClass("fix_width");
		var x_center = el.hasClass("x-center");
		var bottom = el.hasClass("bottom");
		var me_custom = el.hasClass("me_custom");
		var scale_mode=el.hasClass("scale_mode");
		if(me_custom) {
			//自定义的话只变形  不会自动设置left top
			if(scale_mode){
				if(el.hasClass("rotate")){
					var rotate=el.attr("r");
					el.css("transform","scale("+s_mes.scale+") rotate("+rotate+")");
				}
				else{
					el.css("transform","scale("+s_mes.scale+")");
				}
				
			}
			else{
				el.css({
					width: fix_width ? s_mes.sw : el.width() * s_mes.scale,
					height: el.height() * s_mes.scale,
				});				
			}

		} else {
			if(x_center) {
				if(scale_mode){
					el.css("margin-left", -el.width() / 2);
					el.css("transform","scale("+s_mes.scale+")");
					el.css("left",'50%');		
				}
				else{
					el.css({
						width: fix_width ? s_mes.sw : el.width() * s_mes.scale,
						height: el.height() * s_mes.scale,
						left: '50%',
					});	
					el.css("margin-left", -el.width() / 2);
				}
				
			} else {
				if(scale_mode){
				if(el.hasClass("rotate")){
					var rotate=el.attr("r");
					el.css("transform","scale("+s_mes.scale+") rotate("+rotate+")");
				}
				else{
					el.css("transform","scale("+s_mes.scale+")");
				}					
				}
				else{
					if(el.hasClass("right")){
					el.css({
						width: fix_width ? s_mes.sw : el.width() * s_mes.scale,
						height: el.height() * s_mes.scale,
					});								
					}else{
					el.css({
						width: fix_width ? s_mes.sw : el.width() * s_mes.scale,
						height: el.height() * s_mes.scale,
						left: x * s_mes.sw / s_mes.dw,
					});							
					}
				
				}
			}
			if(bottom) {
				var y = parseFloat(el.css("bottom"));
				el.css("bottom", y * s_mes.sh / s_mes.dh);
			} else {
				var y = parseFloat(el.css("top"));
				el.css("top", y * s_mes.sh / s_mes.dh);
			}
		}

	};
	$.each(child_list, function() {
		var el = $(this);
		resize_element(el);
	});
	return {
		show: function() {
			scene_obj.show();
		},
		hide: function() {
			scene_obj.hide();
		},
		vis: function() {
			scene_obj.css("visibility", "visible");
		},
		unvis: function() {
			scene_obj.css("visibility", "hidden");
		},
		resize_element: function(el) {
			resize_element(el)
		}
	};
};
//var init