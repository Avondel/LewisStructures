let isDragging = false;
let isResizing = false;
let count = 0;

	function CreateBond(obj, a, b, c, d){
		//create new HTML elements
      var div_obj = document.getElementById(obj);
		var span_bond = document.createElement("span");
		var span_end1 = document.createElement("span");
		var span_end2 = document.createElement("span");

		bondSetData(span_bond, a, b, c, d); //set data
		ax = span_bond.dataset.ax;
		ay = span_bond.dataset.ay;
		bx = span_bond.dataset.bx;
		by = span_bond.dataset.by;

		calc=Math.atan((ax-bx)/(by-ay));
		calc=calc*180/Math.PI;
		length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));

		//increase element identifier
		count++;
		var id = "bond" + count;
					
      // Set attribute for LINE
      span_bond.setAttribute("id", id);
		span_bond.setAttribute("class","item");
		span_bond.style.height = length + "px";
		span_bond.addEventListener("mousedown",mousedown);
		span_bond.style.left = ax + "px";
		span_bond.style.top = ay + "px";

		//Set attribute for ENDS
		span_end1.setAttribute("id",id+"end1");
		span_end1.setAttribute("class","resizer end1");
		span_end2.setAttribute("id",id+"end2");
		span_end2.setAttribute("class","resizer end2");
		span_end2.style.top= length-15 + "px";
	
		//Rotate bond
		span_bond.style.transform = ("rotate(" + calc +"deg)");
		span_bond.style.transformOrigin = "0 0"; 

      // Append new elemenet
      span_bond.appendChild(span_end1);
		span_bond.appendChild(span_end2);
		span_end1.style.cursor = "grabbing";
		span_end1.addEventListener("mousedown",mousedownEnd);
		span_end2.style.cursor = "grabbing";
		span_end2.addEventListener("mousedown",mousedownEnd);
		div_obj.appendChild(span_bond);
		document.getElementById("data").innerHTML = "ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
		document.getElementById("data").innerHTML += "<br/>" + "calc: " + calc + " Length: " + length;
   }

function mousedown(e) {
	if(!isResizing){
	el = e.target;
   window.addEventListener("mousemove", mousemoveBond);
   window.addEventListener("mouseup", mouseupBond);
   prevX = e.clientX;
   prevY = e.clientY;

	ax = el.dataset.ax;
	ay = el.dataset.ay;
	bx = el.dataset.bx;
	by = el.dataset.by;
	document.getElementById("data").innerHTML = "ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
	document.getElementById("data").innerHTML += "<br/>" + "calc: " + calc + " Length: " + length;
	isDragging = true;
	isResizing = false;
	}
}

function mousedownEnd(e) {
	currentResizer = e.target;
	el=currentResizer.parentNode;
	window.addEventListener("mousemove", mousemoveEnd);
	window.addEventListener("mouseup", mouseupEnd);
	ax = el.dataset.ax;
	ay = el.dataset.ay;
	bx = el.dataset.bx;
	by = el.dataset.by;
	prevX = e.clientX;   //initialization
	prevY = e.clientY;
	document.getElementById("data").innerHTML = "axBeano: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
	document.getElementById("data").innerHTML += "<br/>" + "calc: " + calc + " Length: " + length;
	oldLength = el.offsetHeight;
	currLength = Math.sqrt((prevX - ax)*(prevX - ax) + (prevY - ay)*(prevY - ay));
	lengthDiff = oldLength -currLength;
	isDragging = false;
	isResizing = true;

}	

	function mousemoveBond(e) {
		//alert("In Move Bond: isDrag: " + isDragging + "isResize: " + isResizing);
		if(!isResizing && isDragging){
			ax = el.dataset.ax;
			ay = el.dataset.ay;
			bx = el.dataset.bx;
			by = el.dataset.by;
			let deltaX = prevX - e.clientX;
			let deltaY = prevY - e.clientY;
			ax = ax - deltaX;
			ay = ay - deltaY;
			bx = bx - deltaX;
			by = by - deltaY;
			el.style.transformOrigin = "0 0"; 
			//el.style.left = ax - deltaX + "px"; //Use this for tighter behaviour
			//el.style.top = ay - deltaY + "px";
			el.style.left = ax + "px";
			el.style.top = ay + "px";
			document.getElementById("data").innerHTML = "ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
			document.getElementById("data").innerHTML += "<br/>" + "calc: " + calc + " Length: " + length;
			document.getElementById("data").innerHTML += "<br/>" + "Element: " + el.id;
			document.getElementById("data").innerHTML += "<br/>Drag";
			prevX = e.clientX;
			prevY = e.clientY;
			bondSetData(el, ax, ay, bx, by); //set data
		}
	}
		
	function mouseupBond(){
		window.removeEventListener("mousemove", mousemoveBond);
		window.removeEventListener("mouseup", mouseupBond);
		isResizing = false;
		isDragging = true;
	}

	function mousemoveEnd(e){
		//alert("In Move End: isDrag: " + isDragging + "isResize: " + isResizing);
		if (isResizing) {
			ax = el.dataset.ax;
			ay = el.dataset.ay;
			bx = el.dataset.bx;
			by = el.dataset.by;
			currX = e.clientX; //Current pos
			currY = e.clientY;
			deltaX = currX - ax;
			deltaY = currY - ay;
			if (currentResizer.classList.contains("end2")) {
				currLength = Math.sqrt((currX - ax)*(currX - ax) + (currY - ay)*(currY - ay));
				el.style.transformOrigin = "0 0";
				calc = Math.atan((ax - currX)/(currY - ay));
				calc = calc*180/Math.PI;
				if (ay>currY)
					calc = calc + 180;

		document.getElementById("data").innerHTML = "ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
		document.getElementById("data").innerHTML += "<br/>" + "calc: " + calc + " Length: " + length;
		document.getElementById("data").innerHTML += "<br/>" + "Element: " + el.id;
				document.getElementById("data").innerHTML += "<br/>Resize";
				el.style.height = currLength + lengthDiff + "px";
				el.style.transform = ("rotate(" + calc +"deg)");
				currentResizer.style.top = currLength +lengthDiff - 15 + "px";
				oldLength = el.offsetHeight;
				bx = bx - deltaX;
				by = by - deltaY;			

			}  else if (currentResizer.classList.contains("end1")) {
					currLength = Math.sqrt((currX - ax)*(currX - ax) + (currY - ay)*(currY - ay));
				el.style.transformOrigin = "0 0";
				calc = Math.atan((ax - currX)/(currY - ay));
				calc = calc*180/Math.PI;
				if (ay>currY)
					calc = calc + 180;

		document.getElementById("data").innerHTML = "ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
		document.getElementById("data").innerHTML += "<br/>" + "calc: " + calc + " Length: " + length;
		document.getElementById("data").innerHTML += "<br/>" + "Element: " + el.id;
				document.getElementById("data").innerHTML += "<br/>Resize";
				el.style.height = currLength + lengthDiff + "px";
				el.style.transform = ("rotate(" + calc +"deg)");
				currentResizer.style.top = currLength +lengthDiff - 15 + "px";
				oldLength = el.offsetHeight;
				ax = ax - deltaX;
				ay = ay - deltaY;			
			}	
			bondSetData(el, ax, ay, bx, by); //set data			
		}
	}
	function mouseupEnd() {
	   window.removeEventListener("mousemove", mousemoveEnd);
		window.removeEventListener("mouseup", mouseupEnd);
		isDragging = false;
		isResizing = false;
	}

function bondSetData(el, a, b, c, d){
	el.dataset.ax = a;
	el.dataset.ay = b;
	el.dataset.bx = c;
	el.dataset.by = d;
}

