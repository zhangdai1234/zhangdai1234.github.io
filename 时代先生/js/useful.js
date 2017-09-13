var useful = {
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return decodeURIComponent(r[2]);
		return null;
	},
	randomStr: function(len) {
		var self = this;
		var str = 'qwertyuiopasdfghjklzcxvbnmQWERTYUIOPASDFGHJKLZCXVBNM';
		var result = '';
		while(result.length < len) {
			result += str[self.getRandomInt(0, 51)];
		}
		return result;
	},
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getUrlParam: function(url) {
		var param = {};
		var arr = (url || location.search.substr(1)).split('&');
		arr.forEach(function(item) {
			var arr = item.split('=');
			if(arr.length === 2) {
				param[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
			}
		});
		return param;
	},
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	createStr: function(num) {
		var d = new Date();
		var year = d.getFullYear().toString().substring(2);
		var month = d.getMonth() < 10 ? "0" + d.getMonth().toString() : d.getMonth().toString();
		var day = d.getDate() < 10 ? "0" + d.getDate().toString() : d.getDate().toString();
		var hour = d.getHours() < 10 ? "0" + d.getHours().toString() : d.getHours().toString();
		var minute = d.getMinutes() < 10 ? "0" + d.getMinutes().toString() : d.getMinutes().toString();
		var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds().toString() : d.getSeconds().toString();
		var mseconds = d.getMilliseconds();
		if(mseconds < 10) {
			mseconds = "00" + mseconds;
		} else if(mseconds < 100) {
			mseconds = "0" + mseconds;
		} else {
			mseconds = mseconds.toString();
		};
		var str = year + month + day + hour + minute + seconds + mseconds;
		var length = str.length;

		return str += this.randomStr(num - length);;
	},
	preLoadResource: function(arr, callback) {
		var imgLen = arr.length;
		var loadCallback = function(e) {
			imgLen--;
			if(imgLen < 1) {
				callback();
			}
		};
		arr.forEach(function(src) {
			if(/\.(png|jpg|gif)$/.test(src)) {
				var img = new Image();
				img.onload = img.onerror = loadCallback;
				img.src = src;
			} else {
				$.ajax({
					type: 'GET',
					url: src,
					success: loadCallback,
					error: loadCallback
				});
			}
		});
	},
	isAndroid: function() {
		var u = navigator.userAgent;
		if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			return true;
		} else {
			return false;
		}
	},
	isSafri: function() {
		var u = navigator.userAgent;
		if(u.indexOf("Safari") > -1) {
			return true;
		} else {
			return false;
		}
	},
	createAudio: function(opt) {
		var audioElement = new Audio(opt.src);
		audioElement.loop = opt.loop || false;
		audioElement.autoplay = opt.autoPlay;
		document.body.appendChild(audioElement);
		audioElement.addEventListener("canplaythrough", function() {
			if(useful.isAndroid() == false) {
				$(document).one("touchstart", function() {
					audioElement.play();
				})
				$(document).trigger("touchstart");
			}
		});
		return audioElement;
	},
	indexChange: function() {
		var c = {
			_now: 0,
			_pre: null,
			resetIndex: function(now, cb) {
				//重置index值 并得到该index值
				this._now = now;
				this._pre = null;
				this.getIndex(this._now, function(a) {
					cb(a);
				});
			},
			getIndex: function(now, cb) {
				//						now值为当前点击的索引值（变量）。 获取当前的index值和上一个的index值
				this._now = now;
				if(this._now == this._pre) {
					return false;
				}
				cb(this._now, this._pre);
				this._pre = this._now;
			}
		}
		return {
			resetIndex: c.resetIndex,
			getIndex: c.getIndex
		}
	},
	getArrayVal: function(val, arr) {
		var startIndex = parseInt(val - 1);
		var c = {
			val: startIndex,
			arr: arr,
			init_val: startIndex,
			maxLength: arr.length,
			isrest: false,
			incrementArray: function() {
				if(this.isrest == true) {
					this.isrest = false;
					this.resetIndex();
				}
				this.val++;
				return this.arr[this.val]; //返回数组当前的索引值
			},
			resetIndex: function(n) {
				//重置索引值为初始值
				this.val = this.init_val;
			},
			takeVal: function(n) {
				//每次取出数组中n个值  返回类型为数组
				this.newArr = [];
				var ischange = false;
				for(var i = 0; i < n; i++) {
					var d = this.incrementArray();
					this.newArr.push(d);
					if(d == undefined) {
						ischange = true;
					}
				}
				if(this.newArr.length == n) {
					if(ischange) {
						this.isrest = true;
					}
				}
				return this.newArr;
			}
		};
		return {
			takeVal: function(n) {
				return c.takeVal(n);
			}
		}
	},
	getSingle: function(fn) {
		var cache;
		return function() {
			return cache || (cache = fn.apply(this, arguments));
		}
	},
	transNum: function(n, l) {
		var num = n;
		var length = num.toString().length;
		var maxL = l;
		if(length < maxL) {
			for(var i = 0; i < maxL - length; i++) {
				num = "0" + num;
			}
		}
		else{
			num=num.toString();
		}
		return num;
	},
};