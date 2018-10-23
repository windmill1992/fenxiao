export const util = {
	isWx: function(){
		const ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			$('.header:not(.index)').remove();
			$('.wrapper').css('padding-top', '0');
			return true;
		}else{
			return false;
		}
	},
	previewImg: function(objs, obj, ua, f) {
		if(!ua){
			ua = this.isWx()? 'wx' : 'h5';
		}
		if(ua == 'wx') {
			let imgArray = [],
				curImageSrc = f ? obj.data('src') : obj.attr('src'),
				href = obj.parent().attr('href'),
				hasHref = !href || href == 'javascript:;' || href == 'javascript:void(0);';
			if(curImageSrc && hasHref) {
				objs.each(function(index, el) {
					var itemSrc = f ? $(el).data('src') : $(el).attr('src');
					imgArray.push(itemSrc);
				});
				wx.previewImage({
					current: curImageSrc,
					urls: imgArray
				});
			}
		} else {
            $('body').append('<script src="https://www.17xs.org/res/js/common/TouchSlide.1.1.js"></script>');
            $('body').append('<div id="bigImg"><div class="hd"></div><div class="bd"></div></div>');
            let idx = f ? obj.closest('.preview').index() : obj.closest('.item').index();
            let html = [];
            html.push('<ul>');
            for(let i = 0; i < objs.length; i++) {
                html.push('<li><img src="' + (f ? objs.eq(i).data('src') : objs[i].src) + '" /></li>');
            }
            html.push('</ul>');
            $('#bigImg .bd').append(html.join(''));
            const winh = $(window).height();
            $('#bigImg').show();
            TouchSlide({
                slideCell: '#bigImg',
                mainCell: '.bd ul',
                effect: 'left',
                defaultIndex: idx
            });
            $('#bigImg').find('.bd li').each(function() {
                const _this = $(this);
                $(this).find('img')[0].onload = function(){
                    let h = _this.height();
                    _this.css({
                        'margin-top': (winh - h) / 2 + 'px'
                    });
                }
            });
            $('body').on('click', '#bigImg', function(){
                $(this).remove();
            });
		}
	},
	telValidate:function(tel){
		const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|166|17[0135678]|18[0-9]|19[89])\d{8}$/;
		if(!reg.test(tel)){
	        return false;
	    }else{
	    	return true;
	    }
	},
	formatTime: function(ts, div = '-', flag){
		let dd = new Date(ts);
		let y = dd.getFullYear();
		let m = dd.getMonth() + 1;
		let d = dd.getDate();
		let h = dd.getHours();
		let mm = dd.getMinutes();
		let s = dd.getSeconds();
		return [y, m, d].map(this.formatNum).join(div) + ' ' + [h, mm, s].map(this.formatNum).join(':');
	},
	formatNum: function(n){
		n = n.toString();
		return n[1] ? n : '0' + n;
	},
	getcookie: function(name){
		let strcookie = document.cookie;
		let arrcookie = strcookie.split("; ");
		for(let v of arrcookie) {
			let arr = v.split("=");
			if(arr[0] == name) return decodeURIComponent(arr[1]); //增加对特殊字符的解析  
		}
		return "";
	},
	addcookie: function(name, value, expireMin){
		let cookieString = name + "=" + escape(value) + "; path=/";
		//判断是否设置过期时间  
		if(expireMin > 0) {
			let date = new Date();
			date.setTime(date.getTime + expireMin * 60 * 1000);
			cookieString = cookieString + "; expire=" + date.toGMTString();
		}
		document.cookie = cookieString;
	},
	getPageStyle: function($objs){
		let winw = $('body').width();
		if($objs){
			$objs.each(function(){
				$(this).width(winw);
			})
		}
		document.documentElement.style.fontSize = Math.round(winw * 10 / 375) + 90 + 'px';
	},
	getQueryString: function(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let r = window.location.search.substr(1).match(reg);
		if(r != null)
			return decodeURI(r[2]);
		return null;
	},
	showTips: function(txt, duration) {
		if(!duration){
			duration = 2000;
		}
		if($('#tips').length > 0) return false;
		$('body').append('<div id="tips" class="tips"></div>');
		var $tip = $('#tips');
		$tip.html(txt).fadeIn();
		setTimeout(function() {
			$tip.fadeOut(function() {
				$tip.remove();
			});
		}, duration);
	},
	wxShare: function(obj){
		$.ajax({
			type: "get",
			url: 'https://www.17xs.org/vote/share.do',
			data: { url: location.href },
			success: function(res){
				if(res.code == 1){
					let r = res.result;
					wx.config({
						debug: false,
						appId: r.appId,
						timestamp: r.timestamp,
						nonceStr: r.noncestr,
						signature: r.signature,
						jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'previewImage']
					});

					wx.ready(function() {
						wx.onMenuShareAppMessage({
							title: obj.title,
							desc: obj.desc,
							link: obj.link,
							imgUrl: obj.imgUrl,
							type: 'link',
							success: function() {},
							cancel: function() {}
						});

						wx.onMenuShareTimeline({
							title: obj.title,
							link: obj.link,
							imgUrl: obj.imgUrl,
							success: function() {},
							cancel: function() {}
						});
					});	
				}else{
					Toast.message('分享参数出错！');
				}
			}
		});
	}
}
