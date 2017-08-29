function mousewheel(obj,succFn){
	if (window.navigator.userAgent.indexOf("Firefox")!=-1){
		obj.addEventListener("DOMMouseScroll", fn, false);
	}else{
		obj.onmousewheel=fn;
	}
	function fn(e){
	
		var e=e||window.event;
		var down=true;

		if (e.detail){
			//火狐
			down=e.detail>0;
		}else{
			//谷歌，ie
			down=e.wheelDelta<0;
		}
		succFn(down);

		if (e.preventDefaul){
			e.preventDefault();
		}
		return false;
	}
}