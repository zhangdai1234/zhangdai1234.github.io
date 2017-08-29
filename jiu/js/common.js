var getQuery = function (url) {
    url = url || window.location.search;

    var qMarkPos = url.indexOf('?');
    if (qMarkPos >= 0) {
        url = url.substr(qMarkPos + 1);
    }

    var hashPos = url.indexOf('#');
    if (hashPos >= 0) {
        url = url.substr(0, hashPos);
    }

    var ret = {};
    var arr = url.split('&');
    for (var i = 0; i < arr.length; i++) {
        var kv = arr[i].split('=');
        if (kv[0]) {
            ret[kv[0]] = kv[1] || '';
        }
    }
    return ret;
};
function SetCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + 30 * 60 * 1000);//过期时间 30分钟  
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

$(function () {
    var cook = getCookie('cfrom');
    if (cook == undefined || cook == null || cook == "") {
        var a = getQuery();
        if (a.fw != "" && a.fw != undefined) {
            var co = a.fw;
            SetCookie("cfrom", co);
        }
    }
})

function Dialog(time) {
    if (time) {
        this.delayShow(time);
    }
}
Dialog.prototype.bind = function () {
    var self = this;
    this.$instance.find('.x-close').click(function () {
        self.hide();
        hmTouch('中间弹窗-关闭');
    });
    this.$instance.find('.x-cancel').click(function () {
        self.hide();
        hmTouch('中间弹窗-稍后咨询');
    });
    this.$instance.find('.x-chat').click(function () {
        self.hide();
    });
};
Dialog.prototype.show = function () {
    if (!this.$instance) {
        this.$instance = $(this.html);
        $(document.body).append(this.$instance);
        this.bind();
    }
    this.$instance.show();
};
Dialog.prototype.hide = function () {
    if (this.$instance) {
        this.$instance.hide();
    }
};
Dialog.prototype.delayShow = function (time) {
    if (!time) {
        return;
    }
    if (time < 1000) {
        time *= 1000;
    }
    var self = this;
    this.timer = setTimeout(function () {
        self.show();
    }, time);
};
Dialog.prototype.html = [
    '<div class="dialog">',
        '<a class="x-close" title="关闭" href="javascript:;">',
            '<img src="/newstyle/image/common/dialog_close.png" >',
        '</a>',
        '<a class="x-cancel" href="javascript:;" title="稍后咨询">',
            '<img src="/newstyle/image/common/dialog_cancel.png" >',
        '</a>',
        '<a class="x-chat" href="javascript:JUMP.chat(\'中间弹窗\');" title="立即咨询">',
            '<img src="/newstyle/image/common/dialog_chat.png">',
        '</a>',
    '</div>'
].join('');

function LoginLayer(options) {
    this.options = options || {};
    this.make();
    smslock = false;
    if (this.options.autoshow) {
        this.show();
    }
}
LoginLayer.prototype.html = [
    '<div class="login-layer-box" style="display: none;">',
        '<a href="javascript:;" class="switch-mode-btn mode-pass" title="使用短信验证码登录">',
        '<a href="javascript:;" class="x-close">',
            '<img src="/image/headpage/53tc_003.png" />',
        '</a>',
        '<div class="x-username">',
            '<input placeholder="手机号" name="mobile" maxlength="20" type="text" />',
        '</div>',
        '<div class="x-password">',
            '<input placeholder="密码" maxlength="32" type="password" />',
        '</div>',
        '<div class="x-token">',
            ' <input type="text" placeholder="验证码" class="code-input" id="token" name="yzm" maxlength="20">',
            ' <input class="get-code-btn" type="button" value="立即获取">',
            '<input type="hidden" id="issms" name="issms" value="1">',                                                       
        '</div>',
        '<div class="x-link-box">',
            '<a href="/login/regist.aspx?f=loginlayer" target="_blank"><span>新用户注册</span></a>',
            '<a href="/login/findpass.aspx?f=loginlayer" target="_blank" class="x-findpass"><span>忘记密码</span></a>',
        '</div>',
        '<div class="x-btn-box">',
            '<a href="javascript:;" class="x-submit">立即登录</a>',
        '</div>',
        '<p>欢迎拨打：400-919-7799</p>',
    '</div>'
].join('');
LoginLayer.prototype.make = function () {
    if ($('.login-layer-box').length === 0) {
        this.$layer = $(this.html);
        $(document.body).append(this.$layer);
        renderPlaceholder();

        this.$username = this.$layer.find('.x-username input');
        this.$password = this.$layer.find('.x-password input');
        this.$token = this.$layer.find('.x-token input');
        this.$submit = this.$layer.find('.x-submit');
        this.locked = false;
        $('#issms').val(0);

        codeSecond = 60;
        this.bind();
    } else {
        this.$layer = $('.login-layer-box');
    }
};
LoginLayer.prototype.submit = function () {
    if (this.locked) {
        return;
    }
    var mode = this.$layer.find('.switch-mode-btn').hasClass('mode-pass') ? "pass" : "token";
    var username = $.trim(this.$username.val());
    var password = this.$password.val();
    var token = this.$token.val();
    if (!username) {
        this.$username.focus();
        return layer.msg('请输入手机号');
    }
    if (!password && mode=="pass") {
        this.$password.focus();
        return layer.msg('请输入密码');
    }
    if (!token && mode == "token") {
        this.$token.focus();
        return layer.msg('请输入验证码');
    }
    var isms = 0;
    if (mode == "token") {
        isms = 1;
    }
    var param = {
        ajax: 1,
        mobile: username,
        password: password,
        yzm: token,
        issms: isms

    };
    this.locked = true;
    var self = this;
    $.ajax({
        url: '/login/checklogin.aspx',
        type: 'POST',
        data: param,
        success: function (result) {
            if (result === 'success') {
                self.hide();
                layer.msg('登录成功', {icon: 1});
                setTimeout(function () {
                    if (self.options.onSuccess) {
                        self.options.onSuccess.call(self);
                    }
                }, 100);
            } else if (result === 'error') {
                layer.msg('用户名或密码错误');
            }
            else if (result === 'tokerror') {
                layer.msg('验证码错误');
            }
            else if (result === 'reg') {
                layer.msg('账户不存在，请先进行注册');
            } else {
                layer.msg('登录失败，请稍后再试');
            }

            self.locked = false;
        },
        error: function () {
            layer.msg('登录失败，请稍后再试');
            self.locked = false;
        }
    });
};
LoginLayer.prototype.bind = function () {
    var self = this;
    this.$submit.click(function () {
        self.submit();
    });
    this.$layer.find('.x-close').click(function () {
        self.hide();
    });
    this.$layer.find('.switch-mode-btn').click(function () {
        if (self.$layer.find('.switch-mode-btn').hasClass('mode-pass')) {

            self.$layer.find('.switch-mode-btn').addClass('mode-sms');
            self.$layer.find('.switch-mode-btn').removeClass('mode-pass');
            self.$layer.find('.switch-mode-btn').attr('title', '使用短信验证码登录');
            self.$layer.find('.x-password').hide();
            self.$layer.find('.x-token').show();
            $('#issms').val(1);

        }
        else {
            self.$layer.find('.switch-mode-btn').addClass('mode-pass');
            self.$layer.find('.switch-mode-btn').removeClass('mode-sms');
            self.$layer.find('.switch-mode-btn').attr('title', '使用密码登录');
            self.$layer.find('.x-password').show();
            self.$layer.find('.x-token').hide();
            $('#issms').val(0);
        }
    });
    this.$layer.find('.get-code-btn').click(function () {
        self.getCode();
    });
   
};
LoginLayer.prototype.hide = function () {
    this.$layer.remove();
    this.$layer = null;
};
LoginLayer.prototype.show = function () {
    if (this.$layer) {
        this.$layer.show();
    }
};


function checkMobile(s) {
    var re = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
    return re.test(s);
}

function getCodeTick() {
    var $getCodeBtn = $('.login-layer-box').find('.get-code-btn');
    if (codeSecond <= 0) {
        smslock = false;
        codeSecond = 60;
        $getCodeBtn.val('立即获取');
        return;
    }
    // $getCodeBtn.attr('disabled', true);
    $getCodeBtn.val(codeSecond + "秒后可重发");
    codeSecond--;
    setTimeout(function () { getCodeTick() }, 1000);
}

LoginLayer.prototype.getCode = function () {
    var self = this;
    var mobileValue = $.trim(this.$username.val());
    if (!mobileValue) {
        return layer.msg('请输入手机号');
    }
    if (!checkMobile(mobileValue)) {
        return layer.msg('请输入正确的手机号');
    }
    if (smslock) {
        return;
    }
    $('#token').focus();
    smslock = true;
    $.ajax({
        type: "POST",
        url: "/login/regnew_sms.aspx",
        data: {
            phone: mobileValue
        },
        success: function (data) {
            if (data == "ok") {
                layer.msg("验证码已发送到手机，请注意查收！");
                getCodeTick();
            } else {
                smslock = false;
                layer.msg("发送失败，请稍后重试！");
            }
        },
        error: function () {
            smslock = false;
            layer.msg("发送失败，请稍后重试！");
        }
    });
}



function addCartCount(count) {
    var $section = $('.top-section');
    var $count = $section.find('.x-cart span');
    var val = parseInt($count.html(), 10) || 0;
    $count.html(val + parseInt(count, 10));
}

function renderPlaceholder() {
    if ('placeholder' in document.createElement('input')) {
        return;
    }
    var $input = $('input[type=text],textarea');
    $input.each(function () {
        if (this.__placeholder === true) {
            return;
        }
        var $this = $(this);
        var defaultVal = $this.attr('placeholder');
        $(this).attr('data-placeholder', defaultVal);
        $this.on('focus', function () {
            if ($this.val() === defaultVal) {
                renderNormal();
            }
        });
        $this.on('blur', function () {
            if ($this.val() === '') {
                renderEmpty();
            }
        });
        function renderEmpty() {
            $this.val(defaultVal).addClass('empty');
        }
        function renderNormal() {
            $this.val('').removeClass('empty');
        }
        renderEmpty();
        this.__placeholder = true;
    });
}
renderPlaceholder();

function hmTouch(eventName, tag) {
    if (!window._hmt) {
        return false;
    }
    if (!eventName) {
        return false;
    }
    var e = [];
    var t = [];
    if (window.pageName) {
        var pageName = 'PC' + window.pageName;
        e.push(pageName);
        t.push(pageName);
    }
    e.push(eventName);
    t.push(eventName);
    if (tag) {
        t.push(tag);
    }
    window._hmt.push([
        '_trackEvent',
        e.join('-'),
        getStatPrefix() + t.join('-')
    ]);
}
function lsGet(key) {
    if (!window.localStorage) {
        return null;
    }
    return window.localStorage.getItem(key);
}
function lsSet(key, val) {
    if (!window.localStorage) {
        return false;
    }
    try {
        window.localStorage.setItem(key, val);
    } catch(e) {
        return false;
    }
    return true;
}
function saveChannel() {
    var str = location.search;
    if (!str) {
        return;
    }
    if (str.charAt(0) === '?') {
        str = str.substr(1);
    }
    var arr = str.split('&');
    var v0 = arr[0];
    if (!v0) {
        return;
    }
    var a0 = v0.split('=');
    if (a0[0] && !a0[1]) {
        lsSet('channel', a0[0]);
        lsSet('channel_expire', (new Date).getTime());
    }
}
saveChannel();

function getChannel() {
    var channel = lsGet('channel');
    var expire = lsGet('channel_expire');
    if (channel && expire) {
        var curtime = (new Date).getTime();
        if (curtime - expire < 3600000) {
            return channel;
        } else {
            cleanChannel();
            return '';
        }
    } else {
        return '';
    }
}
function cleanChannel() {
    if (!window.localStorage) {
        return;
    }
    localStorage.removeItem('channel');
    localStorage.removeItem('channel_expire');
}
function getStatPrefix() {
    var channel = getChannel();
    return '[渠道:' + channel + ']';
}

var JUMP = {};
JUMP.chat = function (tag) {
    window.open("http://tb.53kf.com/code/client/10129153/1", "_blank", "width=1000,height=1000");
    hmTouch('在线咨询', tag);
};
JUMP.qx = function (tag) {
    window.open("http://tb.53kf.com/code/client/10129153/4", "_blank", "width=1000,height=1000");
    hmTouch('在线咨询', tag);
};
JUMP.backtop = function () {
    if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = 0;
    } else if (document.body.scrollTop) {
        document.body.scrollTop = 0;
    }
    hmTouch('回到顶部');
};
JUMP.detectMobile = function (url) {
    var thisOS = navigator.platform;
    var os = [
        "iPhone", "iPod", "iPad", "android", "Nokia",
        "SymbianOS", "Symbian", "Windows Phone", "Phone",
        "Linux armv71", "MAUI", "UNTRUSTED/1.0", "Windows CE", "BlackBerry", "IEMobile"
    ];
    for (var i = 0; i < os.length; i++) {
        if (thisOS.match(os[i])) {
            window.location = url;
            return;
        }
    }

    if (navigator.platform.indexOf('iPad') != -1) {
        window.location = url;
        return;
    }

    var check = navigator.appVersion;
    if (check.match(/linux/i)) {
        if (check.match(/mobile/i) || check.match(/X11/i)) {
            window.location = url;
            return;
        }
    }
};

var Util = {};
Util.getQuery = function (url) {
    url = url || window.location.search;

    var qMarkPos = url.indexOf('?');
    if (qMarkPos >= 0) {
        url = url.substr(qMarkPos + 1);
    }

    var hashPos = url.indexOf('#');
    if (hashPos >= 0) {
        url = url.substr(0, hashPos);
    }

    var ret = {};
    var arr = url.split('&');
    for (var i = 0; i < arr.length; i++) {
        var kv = arr[i].split('=');
        if (kv[0]) {
            ret[kv[0]] = kv[1] || '';
        }
    }
    return ret;
};

function MobileAuthLayer(options){
    this.options = options || {};
    this.make();
    if (this.options.autoshow) {
        this.show();
    }
    hmTouch('点击大额券');
}
MobileAuthLayer.prototype.html = [
    '<div class="mobile-layer-box" style="display: none;">',
        '<a href="javascript:;" class="x-close">',
            '<img src="/image/headpage/53tc_003.png" />',
        '</a>',
        '<div class="x-username">',
            '<input placeholder="输入有效手机号领取" name="mobile" maxlength="20" type="text" />',
        '</div>',
        '<div class="x-token">',
            '<input placeholder="验证码" name="code" maxlength="4" type="text" />',
        '</div>',
        '<div class="x-btn-box">',
            '<input class="x-submit-token" value="获取验证码" type="button" />',
        '</div>',
        '<div class="x-tip-box">',
            '<div>每个手机号码只限领取一次</div>',
             '<div>限12.25日，半小时内使用,过期作废,请您尽快使用</div>',
            '<div>仅限在线支付</div>',
        '</div>',
        '<div class="x-btn-box">',
            '<a href="javascript:;" class="x-submit">立即领取</a>',
        '</div>',
    '</div>'
].join('');
MobileAuthLayer.prototype.make = function () {
    if ($('.mobile-layer-box').length === 0) {
        this.$layer = $(this.html);
        $(document.body).append(this.$layer);
        renderPlaceholder();

        this.$username = this.$layer.find('.x-username input');
        this.$token = this.$layer.find('.x-token input');
        this.$submit_token = this.$layer.find('.x-submit-token');
        this.$submit = this.$layer.find('.x-submit');

        this.bind();
    } else {
        this.$layer = $('.mobile-layer-box');
    }
};
MobileAuthLayer.prototype.submit = function () {
    if (this.locked) {
        return;
    }
    var username = $.trim(this.$username.val());
    var token = this.$token.val();
    if (!username) {
        this.$username.focus();
        return layer.msg('请输入手机号');
    }
    if (!token) {
        this.$token.focus();
        return layer.msg('请输入验证码');
    }
    var param = {
        ajax: 1,
        mobile: username,
        code: token
    };
    this.locked = true;
    hmTouch('提交领取大额券');
    var self = this;
    $.ajax({
        url: '/active/get_ticket_pc.aspx?mode=1',
        type: 'POST',
        data: param,
        success: function (result) {
            if (result === 'ok') {
                self.hide();
                layer.msg('领取成功，请在个人中心查看', {icon: 1});
                setTimeout(function () {
                    if (self.options.onSuccess) {
                        self.options.onSuccess.call(self);
                    }
                }, 100);
            } else if (result === "yiling") {
                layer.msg('您已领取过该优惠券');
            }

            else {
                layer.msg('领取失败，请稍后再试');
            }

            self.locked = false;
        },
        error: function () {
            layer.msg('领取失败，请稍后再试');
            self.locked = false;
        }
    });
};

MobileAuthLayer.prototype.submit_token = function () {
    if (this.locked) {
        return;
    }
    var username = $.trim(this.$username.val());
    var token = this.$token.val();
    if (!username) {
        this.$username.focus();
        return layer.msg('请输入手机号');
    }
    if (username.length!=11) {
        this.$username.focus();
        return layer.msg('请输入正确的手机号');
    }

    var param = {
        ajax: 1,
        phone: username
    };
    this.locked = true;
    var self = this;
    $.ajax({
        url: '/login/regnew_sms.aspx',
        type: 'POST',
        data: param,
        success: function (result) {
            if (result === 'ok') {
                layer.msg('发送成功', {icon: 1});

                setTimeout(function () {
                    miao=60;
                    self.$submit_token.attr("disabled",true);
                    self.$submit_token.val(miao+"秒后可重发");
                    timer=setInterval("MobileAuthLayer.prototype.showmiao()",1000);

                    if (self.options.onSuccess) {
                        self.options.onSuccess.call(self);
                    }
                }, 100);
            } else {
                layer.msg('发送失败，请稍后再试');
            }

            self.locked = false;
        },
        error: function () {
            layer.msg('发送失败，请稍后再试');
            self.locked = false;
        }
    });
};

MobileAuthLayer.prototype.bind = function () {
    var self = this;
    this.$submit_token.click(function () {
        self.submit_token();
    });
    this.$submit.click(function () {
        self.submit();
    });
    this.$layer.find('.x-close').click(function () {
        self.hide();
    });
};
MobileAuthLayer.prototype.hide = function () {
    this.$layer.remove();
    this.$layer = null;
};
MobileAuthLayer.prototype.show = function () {
    if (this.$layer) {
        this.$layer.show();
    }
};

MobileAuthLayer.prototype.showmiao = function(){
    miao--;
    $('.x-submit-token').val(miao+"秒后可重发");
    if(miao==0)
    {
        clearInterval(timer);
        $('.x-submit-token').attr("disabled",false);
        $('.x-submit-token').val('获取验证码');
    }
}



function GetLayer(options){
    this.options = options || {};
    this.make();
    if (this.options.autoshow) {
        this.show();
    }
    hmTouch('点击小券');
}
GetLayer.prototype.html = [
    '<div class="get-layer-box" style="display: none;">',
        '<a href="javascript:;" class="x-close">',
            '<img src="/image/headpage/53tc_003.png" />',
        '</a>',
        '<div class="x-username">',
            '<input placeholder="输入有效手机号领取" name="mobile" maxlength="20" type="text" />',
        '</div>',
        '<div class="x-tip-box">',
            '<div>每个手机号码只限领取一次</div>',
        '</div>',
        '<div class="x-btn-box">',
            '<a href="javascript:;" class="x-submit">立即领取礼券</a>',
        '</div>',
    '</div>'
].join('');
GetLayer.prototype.make = function () {
    if ($('.get-layer-box').length === 0) {
        this.$layer = $(this.html);
        $(document.body).append(this.$layer);
        renderPlaceholder();

        this.$username = this.$layer.find('.x-username input');
        this.$submit = this.$layer.find('.x-submit');

        this.bind();
    } else {
        this.$layer = $('.get-layer-box');
    }
};
GetLayer.prototype.submit = function () {
    if (this.locked) {
        return;
    }
    var username = $.trim(this.$username.val());
  
    if (!username) {
        this.$username.focus();
        return layer.msg('请输入手机号');
    }
  
    var param = {
        ajax: 1,
        mobile: username,
    };
    this.locked = true;
    hmTouch('提交领取小券包');
    var self = this;
    $.ajax({
        url: '/active/get_ticket_pc.aspx?mode=2',
        type: 'POST',
        data: param,
        success: function (result) {
            if (result === 'ok') {
                self.hide();
                layer.msg('领取成功，请登录后使用', {icon: 1});
                setTimeout(function () {
                    if (self.options.onSuccess) {
                        self.options.onSuccess.call(self);
                    }
                }, 100);
            } else if(result === "yiling"){
                layer.msg('您已领取过该优惠券');
            }
            else{
                layer.msg('领取失败，请稍后再试');
            }

            self.locked = false;
        },
        error: function () {
            layer.msg('领取失败，请稍后再试');
            self.locked = false;
        }
    });
};


GetLayer.prototype.bind = function () {
    var self = this;
    this.$submit.click(function () {
        self.submit();
    });
    this.$layer.find('.x-close').click(function () {
        self.hide();
    });
};
GetLayer.prototype.hide = function () {
    this.$layer.remove();
    this.$layer = null;
};
GetLayer.prototype.show = function () {
    if (this.$layer) {
        this.$layer.show();
    }
};