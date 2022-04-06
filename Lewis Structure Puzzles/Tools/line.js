function linedraw(ax,ay,bx,by)
{
	alert("Kitty!");
    if(ay>by)
    {
        bx=ax+bx;  
        ax=bx-ax;
        bx=bx-ax;
        by=ay+by;  
        ay=by-ay;  
        by=by-ay;
    }
    var calc=Math.atan((ay-by)/(bx-ax));
    calc=calc*180/Math.PI;
    var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
    document.body.innerHTML += "<div id='line' style='height:" + length + "px;	 width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
}

function setTransform (element, rotationArg, scaleArg, skewXArg, skewYArg) {
    var transformString = ("rotate(" + rotationArg + "deg ) scale(" + scaleArg
        + ") skewX(" + skewXArg + "deg ) skewY(" + skewYArg + "deg )");
    
    // now attach that variable to each prefixed style
    element.style.webkitTransform = transformString;
    element.style.MozTransform = transformString;
    element.style.msTransform = transformString;
    element.style.OTransform = transformString;
    element.style.transform = transformString;
}


	function CreateBondBackup(obj, ax, ay, bx, by){
      var div_obj = document.getElementById(obj);
      // Add span
      var span_obj = document.createElement("span");
		var span_line = document.createElement("span");
		var span_end1 = document.createElement("span");
		var span_end2 = document.createElement("span");
		count++;
		var id = "line" + count;
		
		if(ay>by)
		{
			bx=ax+bx;  
			ax=bx-ax;
			bx=bx-ax;
			by=ay+by;  
			ay=by-ay;  
			by=by-ay;
		}
		var calc=Math.atan((ax-bx)/(by-ay));
		calc=calc*180/Math.PI;
		var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
      // Set attribute for span element, such as id
      span_line.setAttribute("id", id);
		span_line.setAttribute("class","line");
		span_line.style.height = length + "px";
		span_line.style.width = "3px";
		span_line.style.backgroundColor = "black";
		span_line.style.position = "absolute";
		span_line.style.top = ay+"px";
		span_line.style.left = ax+"px";
		span_line.style.transform = ("rotate(" + calc +"deg)");
		span_line.style.transformOrigin = ("0%") + ("0%"); // sets only for valueY
		span_line.setAttribute("draggable","true");
		span_line.setAttribute("onmouseover","dragElement(id)");
		
		span_end1.setAttribute("id",id+"end1");
		span_end1.setAttribute("class","bondEnd");
		span_end1.style.top=ay + "px";
		span_end1.style.left=ax + "px";
		span_end1.style.transform = ("rotate(" + calc +"deg) translate(7px, 50px)");
		span_end1.style.transformOrigin = ("0%") + ("0%");
		span_end1.setAttribute("draggable","true");
		span_end1.setAttribute("onmouseover","dragElement(id)");
		
		span_end2.setAttribute("id",id+"end2");
		span_end2.setAttribute("class","bondEnd");
		span_end2.style.top= by + "px";
		span_end2.style.left= bx +"px";
		span_end2.style.transform = ("rotate(" + calc +"deg) translate(7px, 50px)");
		span_end2.style.transformOrigin = ("0%") + ("0%");
		span_end2.setAttribute("draggable","true");
		span_end2.setAttribute("onmouseover","dragElement(id)");

      // Append new elemenet

      div_obj.appendChild(span_obj);
		div_obj.appendChild(span_end1);
		div_obj.appendChild(span_end2);
   }
