el=document.querySelector("#bond");

let isResizing = false;
let isDragging = false;
el.addEventListener("mousedown", mousedown);

function mousedown(e) {
   window.addEventListener("mousemove", mousemove);
   window.addEventListener("mouseup", mouseup);

   let prevX = e.clientX;
   let prevY = e.clientY;
	let calc = 0;
	isDragging = true;

	function mousemove(e) {
		if(!isResizing && isDragging){
		let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;
		
		var rect = el.getBoundingClientRect();
		document.getElementById("data").innerHTML = "x: " + prevX + " y: " + prevY + " Calc: " + calc;
		document.getElementById("data").innerHTML += "<br/>" + "New Elements: newX: " + newX + " newY: " + newY;
		document.getElementById("data").innerHTML += "<br/>" + "Get Bounding: Left: " + rect.left + " Top: " + rect.top + " Right: " + rect.right + " Bottom: " + rect.bottom + " X: " + rect.x + " Y: " + rect.y + " Width: " + rect.width + " Height: " + rect.height;
		
		el.style.transformOrigin = "0 0"; 
		//el.style.left = Math.round(rect.left) - Math.round(newX) + "px";
      //el.style.top = Math.round(rect.top) - Math.round(newY) + "px";
		el.style.left = rect.left - newX + "px";
		el.style.top = rect.top +1 - newY + "px";
		//document.getElementById("data").innerHTML += "<br/>" + "Element Style: Left" + el.style.left + " Top: " + el.style.top + " ID: " + el.id;
		//el2=document.getElementById("rectangle");
		//el2.style.left = rect.left + "px";
		//el2.style.top = rect.top+"px";
		//el2.style.height = rect.height + "px";
		//el2.style.width = rect.width + "px";
      prevX = e.clientX;
      prevY = e.clientY;
		}
	}
	 
	function mouseup() {
	   window.removeEventListener("mousemove", mousemove);
		window.removeEventListener("mouseup", mouseup);
		isDragging = false;
	}
}

const resizers = document.querySelectorAll(".resizer");
let currentResizer;

for (let resizer of resizers) {
   resizer.addEventListener("mousedown", mousedown);

   function mousedown(e) {
		currentResizer = e.target;
		prevX = e.clientX;   //initialization
		prevY = e.clientY;
		var ax = 250;
		var ay = 300;
		isResizing = true;
		var calc;
		window.addEventListener("mousemove", mousemove);
		window.addEventListener("mouseup", mouseup);
		function mousemove(e){
			if (isResizing) {
				el.style.transform = "rotate("+310+"deg)";
				el.style.transformOrigin = "0 0";
			var rect = el.getBoundingClientRect();
			var currX = e.clientX;
			var currY = e.clientY;
			var currLength = Math.sqrt(rect.length*rect.length + rect.width*rect.width);
			if (currentResizer.classList.contains("end2")) {
				calc = Math.atan(currY - ay)/(currX - ax);
				calc = calc*180/Math.PI;
				document.getElementById("data").innerHTML = "x: " + prevX + " y: " + prevY + "Get Bounding: Left: " + rect.left + " Top: " + rect.top + " rect.right: " + rect.right + " rect.bottom: " + rect.bottom + " rect.x: " + rect.x + " rect.y: " + rect.y + " rect.width: " + rect.width + " rect.height: " + rect.height + " calc: " + calc;
				document.getElementById("data").innerHTML += "<br/>" + "Rotate";
				
				//el.style.height = rect.height - (prevY - currY) + "px";
				el.style.height = Math.sqrt((currY-rect.top)*(currY-rect.top) +(currX-rect.left)*(currX - rect.left)) + "px";
		}  else if (currentResizer.classList.contains("end1")) {
				//el.style.width = rect.width - (prevX - e.clientX) + "px";
				el.style.height = rect.height + (prevY - e.clientY) + "px";
				el.style.top = rect.top - (prevY - e.clientY) + "px";
			}			
			prevX = e.clientX;		//update
			prevY = e.clientY;
			}
		}
  
		function mouseup(){
			window.removeEventListener("mousemove", mousemove);
			window.removeEventListener("mouseup", mouseup);
			isResizing = false;
			isDragging = true;
	  
		}
	}
}