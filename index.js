    	//const定义的变量不可以修改，
    	//var 定义的变量可以修改，不初始化会报undefined
    	//const endTime = new Date(2017,5,21,10,47,52);  //月份0-11，如实写 digit会报undefined
    	//如果数组长度太大或者时间间隔很长，就会有digit[num] is undefined错误
		var window_width=1024;
		var window_height=768;
		var curShowTimeSeconds = 0;
    	var margin_left = 130;
    	var margin_top = 50;
    	var radius = 6;
    	var run = true;
    	var timer;
    	var balls = [];
        const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
    	window.onload=function(){
	    	var canvas = document.getElementById("canvas");
	    	var clock=document.getElementById("clock");
	    	var endtime= document.getElementById("endtime").value;
	    	var subtime= document.getElementById("submitt");
	    	var context = canvas.getContext("2d");
	        var timesup=document.getElementById("timesup");
	    	canvas.width = 1000;
	    	canvas.height = 450;
	    	//var grd = context.createLinearGradient(0,0,0,200);
	    	//grd.addColorStop(0,0,"blue");
	    	//grd.addColorStop(0,200,"white");
	    	//context.fillStyle=grd;
	    	//context.fillRect(0,0,1100,550);
	    	
	    	var margin_left= Math.round(canvas.width/10);
	    	var margin_top= Math.round(canvas.height/5);
	    	var radius = Math.round(Math.random()*10+8); //加号后原始值是10
	    	 	
	    	
	    	curShowTimeSeconds = getCurrentShowTimeSeconds();
            render( context,curShowTimeSeconds );
	    	
	    	var atimer= setInterval(
	    		function(){
	    			render(context,curShowTimeSeconds);  //写数字
	    			update(getCurrentShowTimeSeconds());  
	    		}
	    		,
	    		50);

    		    	
    	    clock.onclick=function(){
    	    	run=false; //停止计时到时效果
    	    	timesup.style.bottom = -100+"px";
	    		window.clearInterval(atimer);
	    		window.clearInterval(ctimer);
	    		window.clearInterval(timer);
	    		timer=setInterval(
	    		    	
	    		    function(){
	    			render(context,curShowTimeSeconds);  //写数字
	    			update(getCurrentShowTimeSeconds());  //时钟状态从getCurrentShowTimeSeconds获取时间。
	    		   }
	    		,
	    		50);
	    	};
	    	// 停止时钟，开启定时器。
	    	subtime.onclick=function subtime(){
	    		//run =true;
	    		this.value="分钟计时";
	    		    window.clearInterval(atimer);
	    		    endtime=document.getElementById("endtime").value;
		    		if(endtime!=null &&  endtime<=1440 ) 
		    		//获取表单输入内容用value，innerHTML不适用
			    		{//alert("hello");
			    		//cxt.clearRect(0,0,1600,1000);	
			    		
			    		var e_time=endtime*60;
		    		    curShowTimeSeconds =e_time;
		    		    window.clearInterval(timer);
		    		    window.clearInterval(atimer);
		    		    timer=setInterval(function(){
		    		    	window.clearInterval(atimer);
		    		    	if(e_time>0)
		    		    	   e_time--;
		    		    	   else if(e_time==0){
			    		    	    if(run){ 
				    		    	   	ctimer=setInterval(function(){
				    		    	   		if(timesup.style.bottom<200)
				    		    	   		   timesup.style.bottom+=20+"px";
				    		    	   		if(balls.length>0)
				    		    	   		   balls.shift();
				    		    	   	}
				    		    	   	,100);
				    		    	   	}
		    		    	   }
		    		        atimer=setInterval(
		    		        	//window.clearInterval(timer);
			    		        function(){   
					    			render(context,e_time);  //写数字
					    			update(e_time);   //更新小球及其轨迹
				    		    }
					    		,
					    		50);
		    		    },1000); //每秒递减
		    		    
			       };  
	    	}
	    	
}//onload	    	
	    	
	    	function update(ntime){  //添加参数ntime 从不同的地方获取当前值
	    		var nextShowTimeSeconds = ntime;
	    		
	    		var nextHours = parseInt(nextShowTimeSeconds/3600);
		    	var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours*3600)/60);
		    	var nextSeconds = nextShowTimeSeconds % 60;
		    	
		    	var curHours = parseInt( curShowTimeSeconds / 3600);
			    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 );
			    var curSeconds = curShowTimeSeconds % 60;
			    
		    	if(nextSeconds != curSeconds){
			    	if( parseInt(curHours/10) != parseInt(nextHours/10) ){  //小时的十位个位
			            addBalls( margin_left + 0 , margin_top , parseInt(curHours/10) );
			        }
			        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
			            addBalls( margin_left + 15*(radius+1) , margin_top , parseInt(curHours/10) );
			        }
			
			        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){ //分钟的十位个位
			            addBalls( margin_left + 39*(radius+1) , margin_top, parseInt(curMinutes/10) );
			        }
			        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
			            addBalls( margin_left + 54*(radius+1) , margin_top , parseInt(curMinutes%10) );
			        }
			
			        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){ //秒数的十位个位
			            addBalls( margin_left + 78*(radius+1) , margin_top , parseInt(curSeconds/10) );
			        }
			        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
			            addBalls( margin_left + 93*(radius+1) , margin_top , parseInt(nextSeconds%10) );
			        }
			
			        curShowTimeSeconds = nextShowTimeSeconds;
		    }
		        updateBalls();
		        
	    	}
	    	
	    	
	    	function updateBalls(){

		    for( var i = 0 ; i < balls.length ; i ++ ){
		        balls[i].x+=balls[i].vx;
		        if(balls[i].x <=radius){  //到了左边
		        	balls[i].x=radius;
		        	balls[i].vx*= -0.8;
		        }
		        else if(balls[i].x>= 1100-radius){
		        	balls[i].x= 1100-radius;
		        	balls[i].vx*= -0.8;
		        } 
		        else { balls[i].x += balls[i].vx;}
		       
			
		        
			balls[i].y += balls[i].vy;
			balls[i].vy += balls[i].g;
		
		        if( balls[i].y >= 450-radius ){
		            balls[i].y = 450-radius;
			        balls[i].vy = - Math.abs(balls[i].vy)*0.8;
		        }
		    }
		
		    //var cnt = 0
		    //for( var i = 0 ; i < balls.length ; i ++ )
		       // if( balls[i].x + radius > 0 && balls[i].x -radius < 1200 )
		           // balls[cnt++] = balls[i];
		
		        while( balls.length > 500){
		            balls.shift();
		    }
		}
		
		    function addBalls( x , y , num ){
		    for( var i = 0  ; i < digit[num].length ; i ++ )
		        for( var j = 0  ; j < digit[num][i].length ; j ++ )
		            if( digit[num][i][j] == 1 ){
		                var aBall = {
		                    x:x+j*2*(radius+1)+(radius+1),
		                    y:y+i*2*(radius+1)+(radius+1),
		                    g:1.5+Math.random(),
		                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,  //水平方向速度
		                    vy:-5,
		                    color: colors[ Math.floor( Math.random()*colors.length ) ]  //随机小球颜色
		                };
		                balls.push( aBall );
		            }
		}

	    	
            function getCurrentShowTimeSeconds() {
            	//var subtime=document.getElementById("submit");
            	var ret=auto(); //函数内声明变量一定加var 否则声明的是全局变量
            	//auto();
			    function auto(){
			    	var curTime = new Date();
					   // var ret = endTime.getTime() - curTime.getTime();
					   //获取当前秒数并返回
					    ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
					    return ret ;//>= 0 ? ret : 0;
			    }
			    
			    //ret = Math.round( ret/1000 ) 
			 return ret;   
    }
	
    	
    	
    //	
             function render( cxt, curShowTimeSeconds ){
		    	cxt.clearRect(0,0,1600,1000);
		    	
		    	var hours = parseInt( curShowTimeSeconds / 3600);
			    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
			    var seconds = curShowTimeSeconds % 60 ;
		    	
		    	renderDigit( margin_left, margin_top , parseInt(hours/10) , cxt );
			    renderDigit( margin_left + 15*(radius +1) , margin_top , parseInt(hours%10) , cxt );
			    renderDigit( margin_left + 30*(radius +1) , margin_top , 10 , cxt );
			    renderDigit( margin_left + 39*(radius +1) , margin_top , parseInt(minutes/10) , cxt);
			    renderDigit( margin_left + 54*(radius +1) , margin_top , parseInt(minutes%10) , cxt);
			    renderDigit( margin_left + 69*(radius +1) , margin_top , 10 , cxt);
			    renderDigit( margin_left + 78*(radius +1) , margin_top , parseInt(seconds/10) , cxt);
			    renderDigit( margin_left + 93*(radius +1) , margin_top , parseInt(seconds%10) , cxt);
		   
		        for( var i = 0 ; i < balls.length ; i ++ ){  //绘制小球
		        cxt.fillStyle=balls[i].color;

		        cxt.beginPath();
		        cxt.arc( balls[i].x , balls[i].y , radius , 0 , 2*Math.PI , true );
		        cxt.closePath();
		
		        cxt.fill();
		    }    
	    }
    
    //写数字
             function renderDigit( x , y , num , cxt ){

		    	cxt.fillStyle = "#0e6c77";
		
			    for( var i = 0 ; i < digit[num].length ; i ++ )
			        for(var j = 0 ; j < digit[num][i].length ; j ++ )
			            if( digit[num][i][j] == 1 ){
			                cxt.beginPath();
			                cxt.arc( x+j*2*(radius+1)+(radius+1) , y+i*2*(radius+1)+(radius+1) , radius , 0 , 2*Math.PI );
			                cxt.closePath();
			
			                cxt.fill();
			            }
		    }