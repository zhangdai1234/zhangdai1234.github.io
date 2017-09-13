$(function () {	
	var opts = {            
	    lines: 13, // 花瓣数目
	    length: 20, // 花瓣长度
	    width: 10, // 花瓣宽度
	    radius: 30, // 花瓣距中心半径
	    corners: 1, // 花瓣圆滑度 (0-1)
	    rotate: 0, // 花瓣旋转角度
	    direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
	    color: 'black', // 花瓣颜色
	    speed: 1, // 花瓣旋转速度
	    trail: 60, // 花瓣旋转时的拖影(百分比)
	    shadow: false, // 花瓣是否显示阴影
	    hwaccel: false, //spinner 是否启用硬件加速及高速旋转            
	    className: 'spinner', // spinner css 样式名称
	    zIndex: 2e9, // spinner的z轴 (默认是2000000000)
	    // top: 'auto', // spinner 相对父容器Top定位 单位 px
	    // left: 'auto'// spinner 相对父容器Left定位 单位 px
	};
	var score_j=0;
	var trun_num=0;
	//获取用户信息
	var auth={};
  var openid = getParam('openid');
  var nickname = getParam('nickname');
	// var url = 'http://test.palm-h.com/main/2017/mirinda/admin/Home/interface/getUserInfo';
	// var param = {
	// 	openid:openid
	// }
	// $.post(url, param, function(ret){
	// 	alert('ret.code', ret.code);
	// 	if(ret.code == 1){
	// 		// auth=ret.data;
	// 		// var b = new Base64();
	// 		// var str = b.encode(auth);
	// 		// alert(str);
	// 		// tap($(".start"),function () {
	// 		// 	window.location.href="http://mirinda.ysmine.com/web/index.html?auth=";
	// 		// })
	// 	}
	// }
	var all_score=0;
	$.ajax({
			type:"post",
			url:"http://test.palm-h.com/main/2017/mirinda/admin/Home/interface/getUserInfo",
			dataType:"json",
			data:{openid:openid},
			success:function (json) {
				// $("#spin_wrap").hide();
					
				
				if(json.code == 1){
					all_score=json.data.score;
					// alert(all_score);
					auth=json.data;
					var jStr = "{ ";
				    for(var item in auth){
				    	if(item=="headimgurl"){
				    		jStr +='"'+item+'":"",';
				    	}
				    	else{
				        jStr +='"'+item+'":"'+auth[item]+'",';
				   	 	}
				    }
				    jStr += '"sex":"1" }';
				    console.log(jStr);
				    
				    // alert(jStr);
				    // var str = encode64(strUnicode2Ansi(jStr));
				    var str =Base64.encode(jStr);  　
				 // var str=auth.toJSONString();
				 // alert(str);
					$(".store").on("touchstart",function () {
						window.location.href="http://mirinda.ysmine.com/web/index.html?auth="+str;
					})
				}		
			}
		})	
	function stringToHex(str){
　　　　var val="";
　　　　for(var i = 0; i < str.length; i++){
　　　　　　if(val == "")
　　　　　　　　val = str.charCodeAt(i).toString(16);
　　　　　　else
　　　　　　　　val += "," + str.charCodeAt(i).toString(16);
　　　　}
　　　　return val;
　　}
	var spinner = new Spinner(opts);
	spinner.spin($("#spin_wrap")[0]);
	// 游戏结束函数
	function gameover(score) {
		console.log(score_j);
		// console.log("游戏结束:"+score+"分")
		$("#spin_wrap").show();
		// alert(score_j);
		$.ajax({
			type:"post",
			url:"http://test.palm-h.com/main/2017/mirinda/admin/Home/interface/updateScore",
			dataType:"json",
			data:{game_id:4,score:score_j,openid:openid,total_score:score},
			success:function (json) {
        // alert(3);
        // alert(openid);
        console.log(json);
				// alert(json.msg);
				$("#spin_wrap").hide();
			}
		})	
	}
	// 获取排行榜数据
	function getRanding() {
		$("#spin_wrap").show();
		$.ajax({
			type:"post",
			url:"http://test.palm-h.com/main/2017/mirinda/admin/Home/interface/getRank",
			dataType:"json",
			data:{game_id:4},
			success:function (json) {
				console.log(json);
				var $ranking_list = $(".ranking_list ul");
				$ranking_list.html("");
				for (var i = 0; i < json.data.length; i++) {	
					var classN = "";	
					if (i==0) {classN = "one";}
					else if(i==1){classN = "two";}	
					else if(i==2){classN = "three";}	
					var $li = $('<li class="list '+classN+'"><div>No.'+(i+1)+'</div><div><img class="headImg" src="'+json.data[i].headimgurl+'" alt=""><img class="first" src="img/one.png" alt=""></div><div>'+json.data[i].nickname+'</div><div>'+json.data[i].score+'分</div></li>')
					$ranking_list.append($li);
				}
				new IScroll(".ranking_list");
				$("#spin_wrap").hide();
			}
		})		
	}

	//loading页的图片
	var loading_arrImg = ["img/loading/jdt.png","img/loading/l0.png","img/loading/l1.png","img/loading/l2.png","img/loading/l3.png","img/loading/l4.png","img/loading/l5.png","img/loading/l6.png","img/loading/l7.png","img/loading/ld_bg.jpg","img/loading/ldk.png","img/loading/logo.png","img/loading/mirinda.png","img/loading/p.png"];
	//其他页的图片
	var arr = ["img/home/d1.png","img/home/d2.png","img/home/d3.png","img/home/down.png","img/home/home_bg.jpg","img/home/ranking.png","img/home/rule.png","img/home/rule_title.png","img/home/start.png","img/no.png","img/off.png","img/one.png","img/over/again.png","img/over/over_title.png","img/over/ranking.png","img/over/score_bg.png","img/over/score_font1.png","img/over/score_font2.png","img/over/score_font3.png","img/over/store.png","img/ranking_title.png","img/share.png","img/tiger/0.jpg","img/tiger/1.jpg","img/tiger/2.jpg","img/tiger/3.jpg","img/tiger/4.jpg","img/tiger/5.jpg","img/tiger/6.jpg","img/tiger/7.jpg","img/tiger/8.jpg","img/tiger/b1.png","img/tiger/b10.png","img/tiger/b15.png","img/tiger/b3.png","img/tiger/b6.png","img/tiger/b8.png","img/tiger/dao1.png","img/tiger/dao2.png","img/tiger/dao3.png","img/tiger/gamebg.jpg","img/tiger/gan1.png","img/tiger/gan2.png","img/tiger/gan3.png","img/tiger/gan4.png","img/tiger/left-btn.png","img/tiger/right-btn.png","img/tiger/score_wrap.png","img/tiger/tiger.png","img/tiger/tqEnd.png","img/x.png"];

	loadingImgLoad();//先加载loading页的图片
	function loadingImgLoad() {
		var index = 0;
		for (var i = 0; i < loading_arrImg.length; i++) {
			var img = new Image();
			img.src= loading_arrImg[i];
			img.onload = function () {
				index++;
				if (index===loading_arrImg.length) {
					loading(arr);//其他图片加载函数
				}
			}
		}
	}
	//图片加载函数
	function loading(arr) {
		var $jdt = $(".jdt");
		var $percent = $(".percent");
		// console.log($percent)
		var jdtW = $jdt.width();
		$jdt.width(0);
		$jdt.find("img").width(jdtW);

		var index = 0;
		var timer = null;
		for (var i = 0; i < arr.length; i++) {
			var img = new Image();
			img.src = arr[i];
			img.onload = function () {
				index++;				
			}
		}
		var w = 0;
		timer = setInterval(function () {			
			var p = Math.min(1,w/jdtW)
			if (p<=index/arr.length||p<0.8) {
				w+=jdtW/100;
				$jdt.width(w);								
				$percent.html(parseInt(p*100)+"%");
			}
			if (p>=1) {
				clearInterval(timer)	
				setTimeout(function () {
					$(".loading").fadeOut();
				},500)
			}
		},30)
	}

	// 点击开始游戏
	tap($(".start"),function () {
		$(".tiger").show();
		gameFn();//游戏函数
		startDao()//倒计时开始游戏
	})
	//倒计时开始游戏
	function startDao() {
		var $dao = $(".dao_wrap");
		$dao.show();
		var i = 2;
		$dao.children().eq(i).show();
		var timer = setInterval(function () {
			i--;
			if (i<0) {
				clearInterval(timer);
				$dao.hide();
			}
			$dao.children().hide();
			$dao.children().eq(i).show();			
		},1000)
	}
	//点击活动规则
	tap($(".rule"),function () {
		$(".rule_wrap").show();
		new IScroll(".rule_wrap .con");
	})
	//活动规则的x按钮
	tap($(".rule_wrap .x"),function () {
		$(".rule_wrap").hide();
	})

	// 点击排行榜（开始页面）
	tap($(".ranking"),function () {
		$(".ranking_wrap").show();
		$(".ranking_list").css("height",$(window).height()-$(".ranking_list").offset().top);
		getRanding();
	})
	
	// 点击排行榜（挑战页面）
	tap($('.ra .fl'),function(){
		$(".ranking_wrap").show();
		$(".ranking_list").css("height",$(window).height()-$(".ranking_list").offset().top);
		getRanding();
	})
	//排行榜的x按钮
	tap($(".ranking_wrap .x"),function () {
		$(".ranking_wrap").hide();
		// $(".over").hide();
		// $(".tiger").hide();

	})

	// 点击显示分享
	tap($(".share_font"),function () {
		$(".share_wrap").show();
	})
	// 点击分享页面隐藏
	tap($(".share_wrap"),function () {
		$(".share_wrap").hide();
	})
	

var game_bol = false;
function gameFn() {

	//根据框的大小设置分数文字的大小	
	$('#score span').css({
		height:$('#score').height(),
		lineHeight:$('#score').height()+"px",
		fontSize:$('#score').height()*0.9
	})
	//获取缩放前的大小
	var innerH = $(".tun1 .inner").height()-$(".tun1 .inner").children().height();
	var inner_divH = $(".tun1 .inner").children().height();
	//为了整屏显示计算比例缩放老虎机
	var w = $(".tiger").width();
	var h = $(".tiger").height();
	var scale = .56/(w/h);
	$(".tiger_wrap").css("transform","scale("+scale+")");

	var score = 50; //总果汁数
	var jetton = 10;//当次注入果汁
	var game_num = 0;//游戏次数
	showJetton();
	$('#score span').html(score)
	// 左边按键，减少果汁
	tap($(".left-btn"),function(){
		if(!gameBol){return;}
		if(jetton>10){jetton -= 10;}
		showJetton()
	})
	// 右边按键，增加果汁
	tap($(".right-btn"),function(){
		if(!gameBol){return;}
		if(score-jetton>=10&&jetton<90){jetton += 10;}
		showJetton();
		
	})
	// 注入果汁显示
	function showJetton(){
		var str = jetton;
		str = str.toString();
		$('.jetton1').text(str.length>1?str.slice(0,1):0)
		$('.jetton2').text(str.slice(-1))
	}

	var gameBol = true;
	var rndArr = [];//中奖数组
	// 拉杆，开始游戏
	tap($(".gan"),function () {
		// if (game_num>=5) {return;}
		if(jetton<=0){
			alert("先注入点果汁吧！");
		}else if(gameBol){
			gameBol = false;
			rndArr = rndArrFn();//获取随机数
			ganMove()//执行游戏杆的动画		
		}
		return false;
	})
	var over_wrapH = null;
	//提前结束
	function tqEndFn(){
		if(!gameBol){return;}
		var fontI = 2;
		if (score<100) {
			fontI = 0;
		}else if(score<1000){
			fontI = 1;
		}
		$(".score_font img").hide();
		$(".score_font img").eq(fontI).show();
		$('.over').show();
		// new IScroll(".over", { scrollX: true });
		var w = $(".over").width();
		var h = $(".over").height();
		var scale = 320/480/(w/h);
		if (!over_wrapH) {over_wrapH=$(".over_wrap").height()}
		$(".over_wrap").css({
			height:over_wrapH,
			top: 0,
			bottom: 0,
			transform:"scale("+Math.min(1,scale)+")"
		})

		if(trun_num>=2) score_j=score*0.1;
		else  score_j=0;

		$('.score').text(score+'分');
		var bai=parseInt(score_j/100);
		var shi=parseInt(score_j/10);
		var ge=parseInt(score_j%10);
		$(".get span").eq(0).html(bai);
		$(".get span").eq(1).html(shi);
		$(".get span").eq(2).html(ge);

		gameover(score);
	}
	tap($('.tqEnd'),function(){
		tqEndFn()
	})

	// 再玩一次
	tap($('.ra .fr'),function(){		
		$('.over').hide();
		startDao();
		trun_num=0;
		score = 50; //总果汁数
		jetton = 10;//当次注入果汁
		game_num=0;
		showJetton();
		$('#score span').html(score);
		$(".rotate .inner").css("transform","translate3d(0px,0px,0px)")
	})
	var canvas = document.querySelector("canvas");
	

	var ctx = canvas.getContext("2d");
	var img = new Image();		
	img.src = "img/tiger/gan1.png";
	img.onload = function () {  
		ctx.drawImage(this,0,0,canvas.width,canvas.height)
    }
    var arrImg = addImg();
    // console.log(arrImg)
	function addImg(){		
		var arr = [];
		for (var i = 0; i < 4; i++) {
			var img = new Image();		
			img.src = "img/tiger/gan"+(i+1)+".png";			    
		    arr.push(img)
		}
	    return arr;
	}
	//游戏点击杆的动画
    function ganMove() {    	
    	var i = 0;
    	var n = 1;
    	// console.log("go")
        clearInterval(canvas.timer)    	
        canvas.timer = setInterval(function () {
        	i+=n;
        	if (n>0) {
        		if (i>=3) {
        			n*=-1;
        		}
        	}else{
        		if (i<=0) {
        			score -= jetton;
        			console.log(rndArr)
        			$('#score span').text(score);//设置显示分数
        			tigerMove($(".tun1 .inner"),4,rndArr[0])
					tigerMove($(".tun2 .inner"),5,rndArr[1])
					tigerMove($(".tun3 .inner"),6,rndArr[2])
					game_num++;
        			clearInterval(canvas.timer)
        		}
        	}        	
        	ctx.clearRect(0,0,canvas.width,canvas.height)
        	ctx.drawImage(arrImg[i],0,0,canvas.width,canvas.height)        	
        },30)
    }
    //执行老虎机动画
	function tigerMove($obj,num,rnd) {
		var n = 0;
		var h = innerH;//动画距离
		var T = Date.now();//获取当前时间	
		var endT = num*100;//动画结束时间
		// 600
		// 800
		// 1000
		// 1200
		// 1400
		// 1600
		requestAnimationFrame(function step() {	
			var p = Math.min(1, (Date.now() - T) / endT);			
			var y = p*h;
			$obj.css("transform","translate3d(0px,"+y+"px,0px)")
			if (n==num&&y>=rnd*inner_divH) {//判断动画结束
				$obj.css("transform","translate3d(0px,"+rnd*inner_divH+"px,0px)")
				if($obj.attr('i')==2){
					// 计算分数
					calculate();	
				}
				return;
			}
			if (p>=1) {
				n++;
				endT += 200;
				T = Date.now();
			}	
			if (n<=num) {requestAnimationFrame(step)}
		})
		return rnd;
	}

	// 获取抽奖结果 @return Array(3)
	function rndArrFn() {
		// 9:美年达logo 几率5
		// 1:橙子美年达 几率5
		// 2:橙子pet装 几率10
		// 3:橙子易拉罐装 几率10
		// 4:西瓜美年达	几率20
		// 5:柚子美年达	几率20
		// 6:青苹果美年达 几率20
		// 7:葡萄美年达	几率 20
		// 8:炸弹	几率10

		var arr = [9,1,2,2,3,3,4,4,4,4,5,5,5,5,6,6,6,6,8,8];

    arr.sort(function () {
			return Math.random()-0.5;
		})
		return [arr[rndFn(0,arr.length-1)],arr[rndFn(0,arr.length-1)],arr[rndFn(0,arr.length-1)]];		
	}
	//随机函数
	function rndFn (min,max) {
		return Math.round(Math.random()*(max-min))+min;
	}

	// 结束一轮游戏，计算分数
	function calculate() {
		trun_num++;
		$(".trun").html(trun_num);
		// alert(trun_num);
		gameBol = true;//为true 可以进入下一轮游戏
		
		if(rndArr[0]!=8&&rndArr[0]==rndArr[1]&&rndArr[1]==rndArr[2]){
			var mul = 0;//倍数
			switch (rndArr[0]){
				case 1:mul = 10;
				break;
				case 2: mul = 8;
				break;
				case 3: mul = 6;
				break;
				case 4: mul = 3;
				break;
				case 5: mul = 3;
				break;
				case 6: mul = 1;
				break;
				case 7: mul = 1;
				break;
				// case 8: mul = -3;
				// break;
				case 9: mul = 15;
				break;
			}
			setTimeout(function () {
				gameEffect(mul);//游戏中奖效果
			},100)
			score += mul*jetton;
		}
		else{			
			var kf = 0;// 扣分
			for(var i = 0; i<rndArr.length; i++){
				if(rndArr[i]==8){
					kf = 10;
					break;
				}
			}
			if (kf==0) {
				score += jetton;
				gameEffect(1)
			}
			// else{
			// 	score -= kf;
			// 	if(score<0){score=0;}				
			// }			
		}
		if(jetton>score){
			jetton=score;			
		}
		if(score>9999){
			score=9999;			
		}
		showJetton();
		$('#score span').text(score);//设置显示分数
		// game_num>=5限制游戏次数
		if (score<=0) {
			setTimeout(function () {
				tqEndFn()//执行结束
				gameover(score_j);//游戏结束触发的函数
			},1000)
		}
	}
	// 游戏中奖效果
	function gameEffect(mul){
		$('.mb').show();
		$('.b'+mul).css('display','inline');
		setTimeout(function(){
			$('.mb').hide();
			$('.b'+mul).hide();
		},1500)
	}
}


//手机点击事件函数
function tap(el,fn){
	el = el.get(0);
	var isMoved = false;
    var x = 0;   
    var y = 0;            
    el.addEventListener("touchstart",function(e){
        isMoved = false;
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        e.preventDefault()
    },false);
    el.addEventListener("touchmove",function(e){
        if (Math.abs(e.touches[0].clientX-x)+Math.abs(e.touches[0].clientY-y)>10) {
            isMoved = true;
        }                        
    },false);
    el.addEventListener("touchend",function(){
        if (!isMoved) {
            fn.call(this);
        }
    })
}
window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(fn){
		return setTimeout(fn,1000/60);
	}
})()
})