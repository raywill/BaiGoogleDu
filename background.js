/*
功能：谷歌百度一键搜索
创建：2012.06.19
作者：研究员Raywill
反馈：http://weibo.com/raywill2
*/
var isOpen = true ,
	DELAY_POPICON = 2000,
	DELAY_KILLEDICON = 3000;

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		switch( request.action ){
			case 'getIsOpen':
				sendResponse({isOpen: isOpen});
				break;
			case 'setKilledNum':
				if( request.killedNum > 0 ){
					setBadge( request.killedNum ,  [255 , 0, 0, 100] );
					removeBadge( DELAY_KILLEDICON );
				}
				break;
			case 'setKeywordLog':
				//alert(request.keyword + request.flag);
				//var url = "http://1.mydream.sinaapp.com/kw.php?kw=" +encodeURIComponent(request.keyword) + "&f=" + request.flag;
				//$.getJSON(url);
				break;
			default:break;
		}
	}
);

chrome.browserAction.onClicked.addListener(function(tabs) {
	switchIcon();
	isOpen = !isOpen ;
	isOpen ? console.log('OPEN -' + getTime()) : console.log('CLOSE-' + getTime());
	chrome.tabs.executeScript(null, {file:"killer.js"});
});

function getTime(){
	var str = '',
		d = new Date(),
		h = d.getHours(),
		m = d.getMinutes(),
		s = d.getSeconds();
	str = h + ':' + ( m < 10 ? '0' + m : m ) + ':' + ( s < 10 ? '0' + s : s );
	return str;
}

function setBadge( text , color ){
	chrome.browserAction.setBadgeText({"text": text || ''});
	color && chrome.browserAction.setBadgeBackgroundColor({"color": color });
}

function removeBadge( delay ){
	//移除标记
	clearTimeout( window.t );
	window.t = setTimeout(function(){
		setBadge();
		clearTimeout( window.t );
	}, delay );
}

function switchIcon(){
	var icon = "logo48.png",
		badgeText = 'ON',
		color = [255, 0, 0, 50];
	if( isOpen ){//sign allowed
		icon = "logo48_.png";
		badgeText = 'OFF';
		color = [0, 255, 0, 50];
	}
	chrome.browserAction.setIcon({path:icon});
	setBadge( badgeText, color );
	removeBadge( DELAY_POPICON );
}
