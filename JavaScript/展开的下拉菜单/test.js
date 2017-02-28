var timerHide=[],timerShow=[];
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
	var oli = document.getElementById("nav"); //获得ul的根节点
	var listh2 = oli.getElementsByTagName("h2");   //获得nav下的两个h2结点
	for(var i = 0;i<listh2.length;i++){
		//给对应的h2添加index属性并赋值，为后面的改变show和hide做准备
		listh2[i].setAttribute("index",i);
		listh2[i].onclick = function(){           //绑定h2事件
			var hul = this.nextSibling || this.nextElementSibling;
			//得到hul的相邻结点
			while(hul.nodeType != 1){
				hul = hul.nextSibling || hul.nextElementSibling;
			}
			var hullist = hul.children;
			var h = getCurrentStyle(hullist[0],"lineHeight");
			var totalheight = h*hullist.length;
			var index = this.getAttribute("index");  //得到index属性的值
			if(!this.getAttribute('flag')){
				timerShow[index] = show(hul,totalheight,index);
				this.setAttribute("flag","flag");
			}else{
				timerHide[index] = hide(hul,0,index);
				this.setAttribute("flag","");
			}
		}
	}
}
function show(obj,targetHeight,index){
	//关闭隐藏定时器
	clearInterval(timerHide[index]);
	return setInterval(function(){
				var speed2 = (targetHeight - obj.offsetHeight)/5;
				speed2 = speed2 > 0 ? Math.ceil(speed2) : Math.floor(speed2);
				if(speed2 == 0){
					clearInterval(timerShow[index]);
					timerShow[index] = null;
				}
				obj.style.height = obj.offsetHeight + speed2 +"px";
			},50);		
	
}

function hide(obj,targetHeight,index){
	//关闭显示定时器
	clearInterval(timerShow[index]);
	return setInterval(function(){
				var speed2 = (targetHeight - obj.offsetHeight)/5;
				speed2 = speed2 > 0 ? Math.ceil(speed2) : Math.floor(speed2);
				if(speed2 == 0){
					clearInterval(timerHide[index]);
					timerHide[index] = null;
				}
				obj.style.height = obj.offsetHeight + speed2 +"px";
			},50);		
	
}