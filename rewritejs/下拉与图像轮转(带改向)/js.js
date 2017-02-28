	timerShow=[],timerHide=[];
	function getTarget(obj,str)
	{
		var Targetvalue;
		if(obj.currentStyle)
		{
			Targetvalue=parseInt(obj.currentStyle[str]);
		}
		else
		{
			Targetvalue=parseInt(getComputedStyle(obj,false)[str]);
		}
		return Targetvalue;
	}
	function show(hul,totalHeight,index)
	{
		clearInterval(timerHide[index]);
		return setInterval(function()
		{
			var speed=(totalHeight-hul.offsetHeight)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(speed==0)
			{
				clearInterval(timerShow[index]);
			}
			hul.style.height=hul.offsetHeight+speed+"px";
		},50);
	}
	function hide(hul,totalHeight,index)
	{
		clearInterval(timerShow[index]);
		return setInterval(function()
		{
			var speed=(totalHeight-hul.offsetHeight)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(speed==0)
			{
				clearInterval(timerHide[index]);
			}
			hul.style.height=hul.offsetHeight+speed+"px";
		},50);
	}
	window.onload=function()
	{
		//下拉按钮操作
		var ul=document.getElementById("nav");
		var ullist=ul.getElementsByTagName("h2");
		for(var i=0;i<ullist.length;i++)
		{
			ullist[i].setAttribute("index",i);
			ullist[i].onclick=function()
			{
				var hul=this.nextSibling || this.nextElementSibling;
				while(hul.nodeType!=1)
				{
					hul=hul.nextSibling || hul.nextElementSibling;
				}
				var hlilist=hul.children;
				var h=getTarget(hlilist[0],"lineHeight");
				var totalHeight=h*hlilist.length;
				var index=this.getAttribute("index");//给index赋值为当前下标i
				if(!this.getAttribute('flag'))
				{
					timerShow[index]=show(hul,totalHeight,index);
					this.setAttribute("flag","flag")
				}
				else
				{
					timerHide[index]=hide(hul,0,index);
					this.setAttribute("flag","");
				}
			}
		}
	
	
		//图片滚动操作
		var div=document.getElementById("div2");
		var ul=document.getElementById("ul");
		var li=ul.getElementsByTagName("li");
		//alert("li.length=="+li.length);//5
		//alert("li[0].offsetWidth=="+li[0].offsetWidth);//100
		ul.style.width=li.length*li[0].offsetWidth+"px";
		var speed=5;
		var time=setInterval(function()
		{
			ul.style.left=ul.offsetLeft+speed+"px";
			//图片向左移动，则执行
			if(ul.offsetLeft<-ul.offsetWidth/2)
			{
				ul.style.left="0px";
			}
			//图片向右移动，则执行
			if(ul.offsetLeft>0)
			{
				ul.style.left=-ul.offsetWidth/2+"px";
			}
		},30);
		/*
		position:relative;//规定元素的定位类型
		float:left;//规定框是否应该移动
		*/
		var leftbutton=document.getElementById("left");
		var rightbutton=document.getElementById("right");
		leftbutton.onclick=function()
		{
			speed=-5;
		}
		rightbutton.onclick=function()
		{
			speed=5;
		}
		
	}	