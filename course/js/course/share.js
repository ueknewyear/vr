 window.onload=function(){
 //分享操作
		var shares = {};
		mui.plusReady(function() {
			plus.share.getServices(function(s) {
				if (s && s.length > 0) {
					for (var i = 0; i < s.length; i++) {
						var t = s[i];
						shares[t.id] = t;
					}
				}
			}, function() {
				console.log("获取分享服务列表失败");
			});
		});
		 //分享链接点击事件

		document.getElementById("share").addEventListener('tap', function() {
			var ids = [{
					id: "weixin",
					ex: "WXSceneSession"
				}, {
					id: "weixin",
					ex: "WXSceneTimeline"
				}, {
					id: "sinaweibo"
				}, {
					id: "tencentweibo"
				}, {
					id: "qq"
				}],
				bts = [{
					title: "发送给微信好友"
				}, {
					title: "分享到微信朋友圈"
				}, {
					title: "分享到新浪微博"
				}, {
					title: "分享到腾讯微博"
				}, {
					title: "分享到QQ"
				}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: bts
			}, function(e) {
				var i = e.index;
				if (i > 0) {
					var s_id = ids[i - 1].id;
					var share = shares[s_id];
					if (share.authenticated) {
						shareMessage(share, ids[i - 1].ex);
					} else {
						share.authorize(function() {
							shareMessage(share, ids[i - 1].ex);
						}, function(e) {
							console.log("认证授权失败：" + e.code + " - " + e.message);
						});
					}
				}
			});
		});

		function shareMessage(share, ex) {
				var msg = {
					extra: {
						scene: ex
					}
				};
				msg.href = "http://www.dcloud.io/hellomui/";
				msg.title = "最接近原生APP体验的高性能前端框架";
				msg.content = "我正在体验HelloMUI，果然很流畅，基本看不出和原生App的差距";
				if (~share.id.indexOf('weibo')) {
					msg.content += "；体验地址：http://www.dcloud.io/hellomui/";
				}
				msg.thumbs = ["_www/images/logo.png"];
				share.send(msg, function() {
					console.log("分享到\"" + share.description + "\"成功！ ");
				}, function(e) {
					console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
				});
			}
}			