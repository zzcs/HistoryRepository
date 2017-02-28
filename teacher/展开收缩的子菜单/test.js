
//设置显示隐藏 定时器数组
//因为在此开启的定时器有多个
var timerShow=[],timerHide=[];


//获取非行间样式的属性值,obj为要获取的元素，attr为属性名
function getCurrentStyle(obj,attr){
	var styleValue;
	//判断浏览器兼容性
	if(obj.currentStyle){
		styleValue = parseInt(obj.currentStyle[attr]);
	}else{
		styleValue=parseInt(getComputedStyle(obj,false)[attr]);	
	}
	console.log(styleValue);
	return  styleValue;	
}

window.onload = function(){
	var oLi = document.getElementById("nav");
	var arryH2 = oLi.getElementsByTagName("h2");
	
	for(var i=0;i<arryH2.length;i++){
		
		//给对应H2添加一个index属性，并赋值，用它来代替定时器数组下标值
		//因为单击H2时必须为对应的H2找到对应定时器做准备
		arryH2[i].setAttribute("index",i);
		//动态的给每一个H2绑定单击事件
		arryH2[i].onclick = function(){
			//根据DOM结构，获取相邻的UL节点
			var hUl = this.nextSibling || this.nextElementSibling;	
			while(hUl.nodeType != 1){
				hUl = hUl.nextSibling || hUl.nextElementSibling;	
			}
			var hLiList = hUl.children;
			
			//获取UL下子元素LI的行高属性的值
			var h = getCurrentStyle(hLiList[0],"lineHeight");
			//计算UL该显示的高度
			var totalHeight = hLiList.length * h;
			//设置UL显示
			hUl.style.display ="block";
			
			//获得H2元素index属性值
			var index = this.getAttribute("index");
			
			//判断H2元素flag属性是否存在或者该属性是否有值
			//如果不存或者值为空字符串 执行show，否则执行hide 
			if(!this.getAttribute('flag')){
				timerShow[index] = show(hUl,totalHeight,index);	
				//设置H2属性falg 值
				this.setAttribute("flag","flag")
			}else{
				timerHide[index] = hide(hUl,0,index);
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