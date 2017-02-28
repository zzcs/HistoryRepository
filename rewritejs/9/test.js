function getCurrentStyle(obj,attr){
	var styleValue;
	//判断浏览器兼容性
	if(obj.currentStyle){
		styleValue = parseInt(obj.currentStyle[attr]);
	}else{
		styleValue=parseInt(getComputedStyle(obj,false)[attr]);	
	}
	return  styleValue;	
}

window.onload = function(){
	var root = document.getElementById("nav");
	var h2list = root.getElementsByTagName("h2");
	for(var i = 0;i<h2list.length;i++){	
		var hul = h2list[i].nextSibling || h2list[i].nextElementSibling;
		while(hul.nodeType != 1){
			hul = hul.nextSibling || hul.nextElementSibling;
		}
		var hullist = hul.children;
		var liheight = getCurrentStyle(hullist[0],"lineHeight");
		var totalheight = liheight*4;
		var timer = show(hul,totalheight);
	}
}

function show(obj,targetHeight,index){
	//关闭隐藏定时器
	//clearInterval(timerHide[index]);
	return setInterval(function(){
				var speed2 = (targetHeight - obj.offsetHeight)/5;
				speed2 = speed2 > 0 ? Math.ceil(speed2) : Math.floor(speed2);
				if(speed2 == 0){
					//clearInterval(timerShow[index]);
					//timerShow[index] = null;
				}
				obj.style.height = obj.offsetHeight + speed2 +"px";
			},50);		
	
}