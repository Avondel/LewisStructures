count = 1;
clicks = 0;
moves = 0;

function CreateAtom(obj, type, symbol){
 		count++; 
		var div_obj = document.getElementById(obj);
      var span_obj = document.createElement("span");
		var id = "atom" + count;
      // Set attribute for span element, such as id
      span_obj.setAttribute("id", id);
		span_obj.setAttribute("class", "nucleus " + type);
		span_obj.setAttribute("draggable",true);
		span_obj.dataset.bond1 = "o,o,o,o";
		span_obj.dataset.bond2 = "o,o,o,o";
		//span_obj.addEventListener("mousedown", mousedownAtom);
		span_obj.addEventListener("ondragstart", ondragstartAtom);
		//span_obj.addEventListener("mouseenter", mouseenterAtom);
		//span_obj.addEventListener("click", clickAtom);
      // Set text for span element
      span_obj.innerHTML = symbol;
		span_obj.dataset.numBonds = 0;
      div_obj.appendChild(span_obj);
		span_obj.dataset.ax = span_obj.offsetWidth/2 + span_obj.offsetLeft;
		span_obj.dataset.ay = span_obj.offsetHeight/2 + span_obj.offsetTop;	
}

function clickAtom(e){ 
	clicks++;
	document.getElementById("Clicks").innerHTML = "Clicks: " + clicks;

}

function ondragstartAtom(e){
	alert("Drag Start");
}
function mousedownAtom(e){
	el = e.target;
	//window.addEventListener("mousemove", mousemoveAtom);
	window.addEventListener("ondragstart", mousemoveAtom);
   window.addEventListener("mouseup", mouseupAtom);
	prevX = e.clientX;
   prevY = e.clientY;	
}

function mousemoveAtom(e){
	moves++;
	document.getElementById("Moves").innerHTML = "Moves: " + moves;
	currX = e.clientX;
	currY = e.clientY;
	gotAtom = false;
	ax = el.dataset.ax; //updates atom to be moved
	ay = el.dataset.ay;
	el.style.left =  el.offsetLeft - (prevX - currX)+ "px";
	el.style.top = el.offsetTop - (prevY - currY) + "px";
	ax = ax - (prevX - currX);
	ay = ay - (prevY - currY);
	el.dataset.ax = ax;
	el.dataset.ay = ay;
	prevX = currX;
	prevY = currY;

	e.stopPropagation();

}
	function mouseupAtom(e){
	window.removeEventListener("click", clickAtom);
	window.removeEventListener("mousemove", mousemoveAtom);
	window.removeEventListener("mouseup", mouseupAtom);
}