window.onload = function () {
    var swiper=null;
    new Vue({
        el:"#wrap",
        data:{
            names:[],
            divisions:["集团赛区","广州南北分赛区","广州东分赛区","佛山分赛区","珠海中山分赛区","深莞惠分赛区","清远分赛区","长沙分赛区","时代邻里分赛区","时代商业分赛区"],
            page8_show_bol:false,//控制第8页显示隐藏
            page8_data:{},
            page9_show_bol:false,//控制第9页显示隐藏
            page9_1_show_bol:false,//控制第9-1页显示隐藏
            page9_2_show_bol:false,//控制第9-2页显示隐藏
            page11_show_bol:false,//控制第11页显示隐藏
            page12_show_bol:false,//控制第12页显示隐藏
            scroller_wrap9:false,//控制第9滚动条显示隐藏
            scroller_wrap11:false,//控制第11滚动条显示隐藏
            page9_division:'',//第9页的赛区
            page9_name:'',//第9页的姓名
            page9_contact:'',//第9页的联系方式
            page11_division:'',//第11页的赛区
            page11_name:'',//第11页的姓名
            page11_tag:'',//第11页的标签
            names_bol:false,//判断是否有讲师数据
            page12_tag:'',
            music_bol:true,
            page6_btn1_bol:false,
            page6_btn2_bol:false,
            scroller_wrap9_ok:false,
            scroller_wrap11_ok:false,
        },
        created:function () {
            // var _this = this;
            // //获取赛区数据
            // ajax("post","Public/data/divisions.json",{},function(sJson){
            //     var json = JSON.parse(sJson);
            //     _this.divisions = json.data;
            // });

            localStorage.clear();
            this.getNames();
        },
        methods:{
            music:function () {
                var audio = document.querySelector("audio");//音乐对象
                this.music_bol = !this.music_bol;
                if (this.music_bol) {
                    audio.play()
                }else{
                    audio.pause()
                }
            },
            getNames:function () {
                var _this = this;
                //获取时代讲师数据

                ajax("post","index.php/Home/Index/retrun_nomination",{},function(json){
                    // var json = JSON.parse(sJson);
                    _this.names = json.data;                
                    _this.names_bol = json.data.length>0 
                    if (_this.names.length>4) {
                        setTimeout(function () {
                            new IScroll(".names", { scrollX: true, scrollbars: 'custom' });
                        })
                    } 
                })
            },
            page8_show:function (item) {
                this.page8_show_bol = true;
                this.page8_data = item;
                setTimeout(function () {
                    new IScroll(".page8 .tag", { scrollX: true, scrollbars: 'custom' });
                })
            },
            page8_hide:function () {
                this.page8_show_bol = false;
            },
            page7_back:function () {
                swiper.slideTo(6, 800, true);
            },
            page9_show:function(){
                this.page9_show_bol = true;                
            },
            page9_back:function () {
                this.page9_show_bol = false;
            },
            page9_submit:function () {
                if (!this.page9_name || !this.page9_contact || !this.page9_division) {
                    alert("您还有选项没有填写哦^ ^");
                    return false;
                }
                var _this = this;
                ajax("post","index.php/Home/Index/sign_up",{name:this.page9_name,contact:this.page9_contact,division:this.page9_division},function(json){
                    // var json = JSON.parse(sJson);
                    _this.page9_1_show_bol = true;//提交成功页面显示
                })
            },
            select9:function (item) {
              this.page9_division = item;
              this.scroller_wrap9 = false;
              this.scroller_wrap9_ok=false;
            },
            scroller_wrap9_show:function () {
                this.scroller_wrap9=true;               
            },
            page9_1_show:function () {
                this.page9_1_show_bol = true;
            },
            page9_1_back:function () {
                this.page9_1_show_bol = false;
                this.page9_show_bol = false;
            },
            page9_2_show:function () {
                this.page9_2_show_bol = true;
            },
            page9_2_back:function () {
                this.page9_2_show_bol = false;
                this.page11_show_bol = false;
                this.page12_show_bol = false;
            },
            page11_show:function(){
                this.page11_show_bol = true;                
            },
            page11_submit:function () {
                if (!this.page11_name || !Trim(this.page11_tag) || !this.page11_division) {
                    alert("您还有选项没有填写哦^ ^");
                    return false;
                }
                var _this = this;
                ajax("post","index.php/Home/Index/nomination",{name:this.page11_name,tag:this.page11_tag,division:this.page11_division},function(json){
                    // var json = JSON.parse(sJson);
                    _this.getNames();
                    _this.page8_data.ticket++
                    // _this.page8_data.tag.push(_this.page11_tag)//添加标签后更新页面数据
                    _this.page9_2_show_bol = true;//提交成功页面显示
                }); 
            },
            select11:function (item) {
              this.page11_division = item;
              this.scroller_wrap11 = false;
              this.scroller_wrap11_ok=false;
            },
            scroller_wrap11_show:function () {
                this.scroller_wrap11=true;                
            },
            page11_back:function () {
                this.page11_show_bol = false;
            },
            page12_show:function () {
                this.page12_show_bol = true;
                swiperAnimate(swiper);
            },
            page12_back:function () {
                this.page12_show_bol = false;
            },
            page12_submit:function () {
                var _this = this;
                var arr = localStorage.vote ? JSON.parse(localStorage.vote) : [];
                if (arr.indexOf(_this.page8_data.id) == -1) {//判断没投票过就加1
                    ajax("post","index.php/Home/Index/add_tag",{tag:this.page12_tag,id:this.page8_data.id,ischange:1},function(json){
                        // var json = JSON.parse(sJson);
                        _this.getNames();
                        // _this.page8_data.tag.push(_this.page12_tag)
                        if (_this.page12_tag != "") {
                            _this.page8_data.ticket++
                            arr.push(_this.page8_data.id)//记录投票过了
                            localStorage.vote = JSON.stringify(arr);
                            if (_this.page8_data.tag.indexOf(_this.page12_tag) == -1) {
			                    // alert("标签有重复");
			                    _this.page8_data.tag.push(_this.page12_tag)//添加标签后更新页面数据
			                }
                        }
                        setTimeout(function () {
                            new IScroll(".page8 .tag", { scrollX: true, scrollbars: 'custom' });
                        })
                    })
                }else {
                    ajax("post","index.php/Home/Index/add_tag",{tag:this.page12_tag,id:this.page8_data.id,ischange:0},function(json){
                        // var json = JSON.parse(sJson);
                        _this.getNames();
                        if (_this.page12_tag != "") {
                        	if (_this.page8_data.tag.indexOf(_this.page12_tag) == -1) {
			                    // alert("标签有重复");
			                    _this.page8_data.tag.push(_this.page12_tag)//添加标签后更新页面数据
			                }
                            
                        }
                        setTimeout(function () {
                            new IScroll(".page8 .tag", { scrollX: true, scrollbars: 'custom' });
                        })
                    })
                }
                _this.page9_2_show_bol = true;//提交成功页面显示
            },
            vote_btn:function(){                
                var _this = this;
                var arr = localStorage.vote ? JSON.parse(localStorage.vote) : [];
                if (arr.indexOf(this.page8_data.id) == -1) {//判断没投票过就加1
                    ajax("post","index.php/Home/Index/add_vote",{id:this.page8_data.id},function(json){
                        // var json = JSON.parse(sJson);
                        if (json.status == 1){
                            // alert('成功');
                            _this.page8_data.ticket++
                            arr.push(_this.page8_data.id)//记录投票过了
                            localStorage.vote = JSON.stringify(arr);
                        }else {
                            alert(json.msg);
                        } 
                    })  
                }else{
                    alert("不能重复投票");
                    // return false;
                }   
            }
        },
        updated:function () {
            if (this.scroller_wrap11==true&&!this.scroller_wrap11_ok) { 
                    this.scroller_wrap11_ok=true;
                    new IScroll(".page11 .scroller_wrap", { scrollX: true, scrollbars: 'custom' });               
            }
            if (this.scroller_wrap9==true&&!this.scroller_wrap9_ok) { 
                    this.scroller_wrap9_ok=true;
                    new IScroll(".page9 .scroller_wrap", { scrollX: true, scrollbars: 'custom' });             
            }
            
        },
        mounted:function () {
            var _this = this;
            var audio = document.querySelector("audio");//音乐对象

            // Audio(audio);
            // audioAutoPlay(audio);
            var images = [
                'aristotle.png', 'bg.jpg', 'deng.png', 'division.png', 'down.png', 'earth.png', 'fine.png', 'footer1.png','hand.png','hd.png','heart.png','kz.png','label.png','logo.png','name.png','page1_bg.png','page1_font.png','page2_bg.png','page2_font.png','page3_bg.png','page3_font.png','page4_1.png','page4_2.png','page4_3.png','page4_4.png','page4_6.png','page4_7.png','page4_bg.png','page4_font.png','page7_btn1.png','page7_btn2.png','page7_fon3.png','page8_font.png','plato.png','sdxs.png','share.png','sun.png','tears.png','vote_title.png','xian.png',"page7_btn1.png","page7_btn2.png","fasheng1.png","fasheng2.png","page6_font1.png","page6_font2.png","page6_font3.png","page6_font4.png","page6_font5.png","page6_font6.png","page6_font7.png","page6_font8.png","page7_stat.png","scrollbar_bg.jpg","gbn.png","footer2.jpg"
            ];

            

            var img = new Image();
            img.src="images/loading1.png";
            img.onload = function () {
                var img = new Image();
                img.src="images/loading2.png";
                img.onload = function () {
                    loading(images,function(oLoading){    
                        
                        swiper = new Swiper('.swiper-container', {
                            direction: 'vertical',
                            initialSlide:0,
                            onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
                                swiperAnimateCache(swiper); //隐藏动画元素 
                                swiperAnimate(swiper); //初始化完成开始动画
                            }, 
                            onSlideChangeStart: function(swiper){ 
                                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                                earth_end()
                                _this.page6_btn1_bol = false;
                                _this.page6_btn2_bol = false;
                            } 
                        });
                        oLoading.style.display = "none";
                        if (_this.names_bol&&_this.names.length>4) {new IScroll(".names" , { scrollX: true, scrollbars: 'custom' });}         
                    })
                }
            }            


            function loading(arr,fn){
                var oLoading = document.querySelector("#loading");
                var loading_img = document.querySelector("#loading img");
                var loading_div = document.querySelector("#loading div");
                var p = document.querySelector("#loading p");
                var index = 0;
                for (var i = 0; i < arr.length; i++) {
                    var img = new Image();
                    img.src="images/"+arr[i];
                    img.onload = function(){
                        index++;
                        p.innerText = parseInt((index/arr.length)*100)+"%";
                        loading_div.style.height = loading_img.offsetHeight*index/arr.length + "px";
                        if (index==arr.length) {
                            setTimeout(function(){                    
                                fn(oLoading);
                            },500)
                        }
                    }
                }
            }
            //触屏屏幕时播放音乐
            // document.addEventListener("touchstart",function(){
            //     audio.play();
            // })
            // iscroll插件的部分代码
            function isPassive() {
                var supportsPassiveOption = false;
                try {
                    addEventListener("test", null, Object.defineProperty({}, 'passive', {
                        get: function () {
                            supportsPassiveOption = true;
                        }
                    }));
                } catch(e) {}
                return supportsPassiveOption;
            }

            
            var earth = document.querySelector(".earth");
            var earth_ctx = earth.getContext("2d");
            var gbn_all = document.querySelector(".gbn_all");
            var earth_img = new Image();
            earth_img.src="images/earth.png";
            earth.width = 375;
            earth.height = 667;
            gbn_all.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件                 
                earth_move()
            }, false); 
            function earth_end() {
                earth_ctx.clearRect(0,0,375,667)
                clearInterval(earth.timer);
            }
            function earth_move() {
                arr=[
                    {x:538,y:840,w:61},{x:504,y:831,w:76},{x:469,y:814,w:93},{x:450,y:797,w:93},{x:431,y:769,w:99},{x:432,y:736,w:114},{x:456,y:711,w:130},{x:479,y:697,w:144},{x:513,y:679,w:152},{x:549,y:668,w:161},{x:605,y:658,w:152},{x:671,y:658,w:150},{x:740,y:665,w:144},{x:792,y:687,w:124},{x:825,y:716,w:117},{x:876,y:765,w:85},{x:865,y:821,w:68}
                ]          
                var index = 0;
                clearInterval(earth.timer);
                earth.timer=setInterval(function () {
                    if (index<arr.length) {
                        earth_ctx.clearRect(0,0,375,667)
                        earth_ctx.save();
                        var x = arr[index].x/2.4-16;
                        var y = 667-(arr[index].y/2.4+16);
                        var s = arr[index].w/76;
                        earth_ctx.translate(x,y-(s*31.6-31.6)/2)
                        earth_ctx.scale(s,s);
                        earth_ctx.drawImage(earth_img,0,0,31.6,31.6)
                        earth_ctx.restore();
                        if (index==0||index==1||index==16) {
                            earth.style.zIndex = 0
                        }else{
                            earth.style.zIndex = 2
                        }
                    }else{
                        earth_ctx.clearRect(0,0,375,667)
                    }
                    index++;
                    if (index>arr.length+3) {
                        index=0;
                    }
                    
                },100)
                
            }

            // 闪动效果
            var canvas = document.querySelector(".page4 canvas")

            var ctx = canvas.getContext("2d");
            var flash_imgs = [];
            for (var i = 2; i < 8; i++) {
            var img = new Image();
                img.src = "images/page4_"+i+".png";
                flash_imgs.push(img);
            } 
            var img = new Image();
            img.src = "images/page4_1.png";
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
            }
            
            // 第4页闪动效果
            var page4 = document.querySelector(".page4");
            var aristotle  = document.querySelector(".aristotle");
            var flash = document.querySelector(".flash");
            var white_bg = document.querySelector(".white_bg");
            var aristotle_end = false;
            var page4_next_bol = false;
            aristotle.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
                aristotle_end = true;
                flashFn()
            }, false); 
            var y = 0;
            var dY = 0;
            page4.addEventListener("touchstart",function (e) {
                y = e.touches[0].clientY;
                e.preventDefault();
            })
            page4.addEventListener("touchmove",function (e) {
                dY = y - e.touches[0].clientY;
            })
            page4.addEventListener("touchend",function (e) {
                if (dY>30&&aristotle_end) {
                    page4_next()
                }else if(dY<-30&&!page4_next_bol){
                    swiper.slideTo(2, 800, true);
                    clearInterval(flash.timer);
                    flash.style.display = "none";
                    aristotle_end = false;
                }
            })

            //闪函数
            function flashFn(){
                var bol = false;
                flash.timer = setInterval(function () {
                    bol = !bol;
                    if (bol) {                               
                        flash.style.display = "block";
                    }else{
                        flash.style.display = "none";
                    }
                },100)
            }
            //重第4页切换到第五页闪动效果
            function page4_next() {
                if (page4_next_bol) {return;}
                page4_next_bol = true;
                var n = 0;
                clearInterval(flash.timer);
                flash.style.display = "none";
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.drawImage(flash_imgs[0],canvas.width,canvas.height)
                canvas.style.display = "block";
                flash.timer = setInterval(function () {
                    n++;
                    if (n==7) {
                        clearInterval(flash.timer);
                        ctx.fillStyle="white";
                        ctx.fillRect(0,0,canvas.width,canvas.height)
                        white_bg.style.display = "block";
                        swiper.slideTo(4, 0, true);
                        page4_next_bol = false;
                        aristotle_end = false;
                        white_bg_hide()
                        // flash.style.display = "none";
                        // flash.children[0].src="images/page4_1.png";
                        
                        canvas.style.display = "none";
                    }else{
                        // flash.children[0].src="images/page4_"+n+".png";
                        ctx.drawImage(flash_imgs[n-1],0,0,canvas.width,canvas.height)
                    }        
                },150)
            }
            // 白色背景慢慢显示第五页
            function white_bg_hide() {    
                var p = 150;
                var timer = setInterval(function () {
                    p-=3;
                    if (p<0) {
                        clearInterval(timer);
                        white_bg.style.display = "none";
                        white_bg.style.opacity = 1;
                    }else{
                        white_bg.style.opacity = p/100;
                    }        
                },30)
            }
            var page6_btn1 = document.querySelector(".page6 .btn1");
            page6_btn1.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件                 
                _this.page6_btn1_bol = true;
            }, false);
            var page6_btn2 = document.querySelector(".page6 .btn2");
            page6_btn2.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件                 
                _this.page6_btn2_bol = true;
            }, false);
        },
        directives:{
            tap:{
                acceptStatement:true,
                inserted: function (el,binding) {
                    var isMoved = false;
                    var x = 0;   
                    var y = 0;            
                    el.addEventListener("touchstart",function(e){
                        isMoved = false;
                        x = e.touches[0].clientX;
                        y = e.touches[0].clientY;
                    },false);
                    el.addEventListener("touchmove",function(e){
                        if (Math.abs(e.touches[0].clientX-x)+Math.abs(e.touches[0].clientY-y)>10) {
                            isMoved = true;
                        }                        
                    },false);
                    el.addEventListener("touchend",function(){
                        if (!isMoved) {
                            // binding.value(binding.arg);
                            // console.log(binding.value)
                            binding.value.fn(binding.value.value);
                        }
                    },false);
                }
            }
        }
    })


    // var weixin={
    //     config:function(){
    //         var url=window.location.href.split("#")[0];
    //         ajax("get","http://m.palm-h.com/2017/sofia/jssdk/jssdk.php",{"url":url},function(s){
    //             var s=eval("("+s+")");
    //             wx.config({
    //                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //                  appId: s.appId, // 必填，公众号的唯一标识
    //                  timestamp: s.timestamp, // 必填，生成签名的时间戳
    //                  nonceStr: s.nonceStr, // 必填，生成签名的随机串
    //                  signature: s.signature,// 必填，签名，见附录1
    //                  jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','uploadImage','downloadImage','previewImage']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //             });
    //         })
    //     },
    //     share:function(shareData){
    // //      alert(title);

    //         var data = {
    //             title: "【寻找时代先生】时代地产内部讲师培养计划", // 分享标题
    //             link: window.location.href.split("#")[0], // 分享链接
    //             imgUrl: 'images/share.jpg', // 分享图标
    //             desc: '测试', // 分享描述,
    //             success:function(){
    //                 TDAPP.onEvent('分享')
    //             },
    //             cancel:function(){
    //             }
    //         }
    //         if (shareData) data = shareData
    //         wx.onMenuShareTimeline({
    //             title: data.desc, // 分享标题
    //             link: data.link, // 分享链接
    //             imgUrl: data.imgUrl, // 分享图标
    //             success: data.success,
    //             cancel: data.cancel
    //         });
    //         wx.onMenuShareAppMessage({
    //             title: data.title, // 分享标题
    //             desc: data.desc, // 分享描述
    //             link: data.link, // 分享链接
    //             imgUrl: data.imgUrl, // 分享图标
    //             type: '', // 分享类型,music、video或link，不填默认为link
    //             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //             success: data.success,
    //             cancel: data.cancel
    //         });
    //     }
    // }


    // weixin.config();

    // wx.ready(function(){
    //     //alert(2)
    //     weixin.share();
    // });



}

function ajax(method,url,json,cb){
    $.ajax({
        type:method,
        url:url,
        data:json,
        dataType:"json",
        success:function(data){
            cb(data)
        },
        error:function () {
            alert("加载失败")
        }
    })
    // if (window.XMLHttpRequest) {
    //     var xmlhttp = new XMLHttpRequest();
    // }else{
    //     var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");           
    // }
    // // {name:"abc",age:18}转name=abc&age=18      
    // var arr = [];
    // for(var key in json){
    //     var str = key + "=" +json[key];
    //     arr.push(str);
    // }// ["name=abc","age=18"]
    // var str = arr.join("&");//"name=abc&age=18"

    // if (method=="get") {
    //     xmlhttp.open("get",url+"?"+str);
    //     xmlhttp.send();
    // }else{
    //     xmlhttp.open("post",url);
    //     xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //     xmlhttp.send(str);
    // }

    // xmlhttp.onreadystatechange = function(){
    //     if (xmlhttp.readyState==4&&xmlhttp.status==200) {               
    //         cb(xmlhttp.responseText);
    //     }
    // }

}
//去空格
function Trim(str)
{ 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
}



// function audioAutoPlay(audio){
//     audio.play();
//     document.addEventListener("WeixinJSBridgeReady", function () {
//             audio.play();
//     }, false);
//     document.addEventListener('YixinJSBridgeReady', function() {
//         audio.play();
//     }, false);
// }