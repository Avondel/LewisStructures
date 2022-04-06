   var container = document.querySelector("#Container");
	
	
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", elementDrag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", elementDrag, false);


	function linedraw(ax,ay,bx,by)
{
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
	 
	document.body.innerHTML += "<div id='line' draggable =true style='height:" + length + "px;width:3px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
	 
	document.body.innerHTML += "<div id = 'handle' draggable = true onmousedown = 'dragStart(e)' style = 'height: 20px; width: 20px; background-color: blue; position: absolute; top:290px;left: 280px'></div>"	
	
	document.body.innerHTML += "<div id = 'center' style = 'height: 20px; width: 20px; background-color: black; border-radius: 50%; position:absolute; top: 290px; left: 490px;'></div>"
	
   /* document.body.innerHTML += "<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"*/
}

function dragElement(elmnt) {
	//alert(elmnt.id);
	//elmnt = document.getElementById(id);
   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
   //if (document.getElementById(elmnt.id + "header")) {
		/*if present, the header is where you move the DIV from:*/
//		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragStart;
///	}
}

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
	 alert("Kitty!");
    // get the mouse cursor position at startup:
    var pos1 = 0;
	 var pos2 = 0;
	 var pos3 = e.clientX;
    var pos4 = e.clientY;
    document.onmouseup = dragEnd;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

 function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    e.target.style.top = (e.target.offsetTop - pos2) + "px";
    e.target.style.left = (e.target.offsetLeft - pos1) + "px";
  }


  function dragEnd() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
