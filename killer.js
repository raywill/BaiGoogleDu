/*
功能：谷歌百度一键搜索
创建：2012.06.19
作者：研究员Raywill
反馈：http://weibo.com/raywill2
*/

var isOpen = true;

chrome.extension.sendRequest({action: "getIsOpen"}, function(response) {
	isOpen = response.isOpen ;
	//alert("Hi tehre");
	if( isOpen ){
		googleBaiduer();
	}
});

function insertAfter(newElement, targetElement)
 {
           var parentEl = targetElement.parentNode;
            if(parentEl.lastChild == targetElement)
            {
                parentEl.appendChild(newElement);
            }else
            {
                parentEl.insertBefore(newElement,targetElement.nextSibling);
            }            
}

function replaceIt(newElement , targetElement)
{
	var t = targetElement.parentNode;
	if (t)
	{
		t.replaceChild ( newElement, targetElement);
	}
	else
	{
		alert("遇到麻烦了，请微博联系：研究员raywill");
	}
}

function googleBaiduer(){
	//日志输出
	//console.log('【Google Baidu搜索穿越】日志输出');
	console.log('执行时刻：' + getTime() );
	console.log('\n');



	//alert("Hi tehre");
	//var s = document.getElementsByClassName('d_sign_split');
	var s1 =  document.getElementsByName("btnK");
	//var s2 =  document.getElementsByName("q") ;
	var s2 = document.getElementById("tsf");
	//var s2 = document.getElementById("tsf");
	
	var b1 =  document.getElementById("su");

	if(s1 && s1.length > 0)
	{
		var BaiduBtn = document.createElement("input");
		BaiduBtn.type = "submit";
		BaiduBtn.value = "Baidu Search";
		BaiduBtn.name = "btnK";
		BaiduBtn.onclick = function(){
			//alert("clicked");
			var keyword_input = document.getElementsByName("q");
			//alert(keyword_input[0].value);
			setKeywordLog(keyword_input[0].value, "B");
			window.location.href='http://www.baidu.com/s?wd=' + keyword_input[0].value;
			return false;
		};
		insertAfter(BaiduBtn, s1[0]);
	}
	else if (s2)
	{
		var BaiduBtn = document.createElement("input");
		BaiduBtn.type = "submit";
		BaiduBtn.value = " Baidu ";
		BaiduBtn.name = "btnG";
		BaiduBtn.style.paddingTop = "0px";
		BaiduBtn.style.paddingLeft = "10px";
		BaiduBtn.style.marginLeft = "10px";
		BaiduBtn.style.width = "80px";
		BaiduBtn.style.height = "28px";
		BaiduBtn.style.color = "white"; // 74, 139, 245  blue
		BaiduBtn.style.backgroundColor = "#4A8BF5"; // 74, 139, 245  blue
		BaiduBtn.style.borderBottomWidth = "0";
		BaiduBtn.style.borderTopWidth = "4";
		BaiduBtn.style.borderColor = "#4A8BF5"; 
		BaiduBtn.style.borderStyle	 = "solid";
		BaiduBtn.onclick = function(){
			//alert("clicked");
			var keyword_input = document.getElementsByName("q");
			//alert(keyword_input[0].value);
			setKeywordLog(keyword_input[0].value, "B");
			window.location.href='http://www.baidu.com/s?wd=' + keyword_input[0].value;
			return false;
		};
		replaceIt(BaiduBtn, document.getElementById("sfopt"));
		//alert(s2);
		//insertAfter(BaiduBtn, s2[0]);
		//s2.appendChild(BaiduBtn);
	}
	else if (b1)  // Search Google in Baidu
	{
		var BaiduBtn = document.createElement("input");
		BaiduBtn.type = "submit";
		BaiduBtn.value = "Google";
		BaiduBtn.className = "s_btn btn";
		BaiduBtn.onclick = function(){
			//alert("clicked");
			var keyword_input = document.getElementById("kw");
			//alert(keyword_input.value);
			setKeywordLog(keyword_input.value, "G");
			window.location.href="https://www.google.com.hk/search?q="+keyword_input.value;
			return false;
		};
		insertAfter(BaiduBtn, b1);
	}
}

function getTime(){
	var str = '',
		d = new Date(),
		h = d.getHours(),
		m = d.getMinutes(),
		s = d.getSeconds();
	str = h + ':' + ( m < 10 ? '0' + m : m ) + ':' + ( s < 10 ? '0' + s : s );
	return str;
}


function setKeywordLog( kw, flag ){
	chrome.extension.sendRequest({action: "setKeywordLog", keyword: kw, flag: flag }, function(response) {
	});
};

function setKilledNum( n ){
	chrome.extension.sendRequest({action: "setKilledNum",killedNum: n+'' }, function(response) {
	});
};