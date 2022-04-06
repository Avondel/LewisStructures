
let isDragging = false;
let isResizing = false;
let gotAtom = false;
let moveOrigin = false;
let count = 0;

function ListChildren(){
	
	mol=document.getElementById("bond1");
	var c = mol.children;
	var txt = "";
	var i;
	if(c.length===0)
		txt = "no children";
	else
		for (i = 0; i < c.length; i++) {
			txt = txt + c[i].tagName + c[i].id+"<br>";
	}
	document.getElementById("data").innerHTML = txt;
}

function CreateAtom(obj, type, symbol){
 		count++; 
		var div_obj = document.getElementById(obj);
      var span_obj = document.createElement("span");
		var id = "atom" + count;
      // Set attribute for span element, such as id
      span_obj.setAttribute("id", id);
		span_obj.setAttribute("class", "nucleus " + type);
		span_obj.addEventListener("mousedown", mousedownAtom);
		//span_obj.addEventListener("mouseenter", mouseenterAtom);
		span_obj.addEventListener("click", clickAtom);

      // Set text for span element
      span_obj.innerHTML = symbol;
		span_obj.dataset.numBonds = 0;
      div_obj.appendChild(span_obj);
		span_obj.dataset.ax = span_obj.offsetWidth/2 + span_obj.offsetLeft;
		span_obj.dataset.ay = span_obj.offsetHeight/2 + span_obj.offsetTop;	
		document.getElementById("data").innerHTML = "ax: " + span_obj.dataset.ax + " ay: " + span_obj.dataset.ay;
}

function CreateBond(obj, ax, ay, bx, by){
		count++;	
		//create new HTML elements
      var div_obj = document.getElementById(obj);
		var span_bond = document.createElement("span");
		var span_end1 = document.createElement("span");
		var span_end2 = document.createElement("span");
		var id = "bond" + count;

		bondSetData(span_bond, ax, ay, bx, by); //set data
		currLength=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
		calc=Math.atan((ax-bx)/(by-ay));
		calc=calc*180/Math.PI;
      // Set attribute for LINE
      span_bond.setAttribute("id", id);
		span_bond.setAttribute("class","bond");
		span_bond.style.height = currLength + "px";
		span_bond.addEventListener("mousedown",mousedown);
		span_bond.style.left = ax + "px";
		span_bond.style.top = ay + "px";

		//Set attribute for ENDS
		span_end1.setAttribute("id",id+"end1");
		span_end1.setAttribute("class","resizer end1");
		span_end1.style.top = -50+"px";
		span_end1.style.left= -40+"px";
		span_end2.setAttribute("id",id+"end2");
		span_end2.setAttribute("class","resizer end2");
		span_end2.style.top= currLength -50 + "px";
		span_end2.style.left = -40 + "px";
		
		//Rotate bond
		span_bond.style.transform = ("rotate(" + calc +"deg)");

      // Append new elemenet
      span_bond.appendChild(span_end1);
		span_bond.appendChild(span_end2);
		span_end1.style.cursor = "grabbing";
		span_end1.addEventListener("mousedown",mousedownEnd);
		span_end2.style.cursor = "grabbing";
		span_end2.addEventListener("mousedown",mousedownEnd);
		div_obj.appendChild(span_bond);
   }

function mousedownAtom(e){
	el = e.target;
	window.addEventListener("mousemove", mousemoveAtom);
   window.addEventListener("mouseup", mouseupAtom);
	prevX = e.clientX;
   prevY = e.clientY;	
}

function clickAtom(e){ 

//alert("Got atom: " + gotAtom + " atom1: " + atom1.id + " e.target: " + e.target.id);;
	if(gotAtom==true && e.target.id != atom1.id){ //create molecule
	
		var moleculeBit = document.createElement("div"); //create
		var newLine = document.createElement("span");
		atom2 = e.target;
		count++;
		
		document.getElementById("PlayArea").appendChild(moleculeBit); //append
		moleculeBit.appendChild(atom1);
		moleculeBit.appendChild(atom2);
		moleculeBit.appendChild(newLine);
		
		moleculeBit.setAttribute("id","bit1");	//set attributes for molecule div
		moleculeBit.setAttribute("class", "Molecule");
		
		ax = atom1.dataset.ax - newLine.parentElement.offsetTop;	//calculations
		ay = atom1.dataset.ay - newLine.parentElement.offsetLeft;
		bx = atom2.dataset.ax - newLine.parentElement.offsetTop;
		by = atom2.dataset.ay - newLine.parentElement.offsetLeft;
		length = Math.sqrt((bx - ax)*(bx - ax) + (by - ay) * (by - ay));
		calc = Math.atan((ax - bx)/(by - ay));
		calc = calc * 180/Math.PI;
		if (ax >= bx)
			calc = calc - 180;
		
		document.getElementById("data").innerHTML = "ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
		document.getElementById("data").innerHTML += "</br>Length: " + length + " calc: " + calc;
		document.getElementById("data").innerHTML += "</br>Molecule offsets: Top: " + newLine.parentElement.offsetTop + " Left: " + newLine.parentElement.offsetLeft + " Parent: " + newLine.parentElement.id;
		
		newLine.setAttribute("id","bond"+count);
		newLine.setAttribute("class", "bond");	
		newLine.style.transformOrigin = "10px 0px";
		newLine.style.top = by + "px";
		newLine.style.left = bx - 8 + "px";
		newLine.style.height = length + "px";
		newLine.style.transform = ("rotate(" + calc +"deg)");
		newLine.dataset.end1 = atom1.id;
		newLine.dataset.end2 = atom2.id;
		newLine.addEventListener("mousedown", moleculeDown);
		
		atom1.dataset.numBonds = 1;    //update for more bonds
		atom2.dataset.numBonds = 1;
		atom1.dataset.bond1 = newLine.id;
		atom1.dataset.type1 = 's';
		atom1.dataset.orientation1 = 'b';
		atom1.dataset.atom1 = atom2.id;
		atom1.style.top = ay - atom1.offsetHeight/2 + "px";
		atom1.style.left = ax - atom1.offsetWidth/2 + "px";
		atom2.dataset.bond1 = newLine.id;
		atom2.dataset.type1 = 's';
		atom2.dataset.orientation1 = 't';
		atom2.dataset.atom1 = atom1.id;
		atom2.style.top = by - atom2.offsetHeight/2 + "px";
		atom2.style.left = bx - atom2.offsetWidth/2 + "px";

	}
	else {
		gotAtom = true;
		atom1 = e.target;
	}
}

function mouseenterAtom(e){
	if(haveBond){
		el_atom = e.target;
		mol = document.getElementById("Molecule");
		el.removeChild(currentResizer);
		el.appendChild(el_atom);
		el_atom.style.top = 0 + "px";
		el_atom.style.left = 0 + "px";
		mouseupAtom();
		mouseupEnd();
		if (currentResizer.classList.contains("end2")){
			el_atom.classList.add("end2");
			el_atom.style.top = el_atom.parentElement.offsetHeight - el_atom.offsetWidth/2+"px";
			el_atom.style.left = -el_atom.offsetWidth/2 +7+ "px";
		}
		else
		{
			el_atom.classList.add("end1");
			el_atom.style.top = -el_atom.offsetHeight/2 + "px";
			el_atom.style.left = 7-el_atom.offsetWidth/2 + "px";
		}
		el_atom.addEventListener("mousedown",mousedownEnd);
   }
   document.getElementById("data").innerHTML = txt;
}

function mousemoveAtom(e){
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
	if ( el.dataset.numBonds > 0 ){
		atom2 = document.getElementById(el.dataset.atom1);
		bond = document.getElementById(el.dataset.bond1);
		bx = atom2.dataset.ax;
		by = atom2.dataset.ay;
		length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
		calc=Math.atan((ax-bx)/(by-ay));
		calc=calc*180/Math.PI;
		if(ay <= by)
			calc = calc + 180;
		bond.style.height = length + "px";
		/*if (el.dataset.orientation1 == 'b')
			bond.style.transform = ("rotate(" + calc +"deg)");
		else {
			bond.style.top = ay + "px";
			bond.style.left = ax + "px";
			calc = calc - 180;
			bond.style.transform = ("rotate(" + calc +"deg)");
		}*/
		if (el.dataset.orientation1 == 't') {
			bond.style.top = ay - bond.parentElement.offsetTop + "px";
			bond.style.left = ax + - bond.parentElement.offsetLeft + "px";
			calc = calc - 180;
		}
		bond.style.transform = ("rotate(" + calc + "deg)");
		document.getElementById("data").innerHTML = "Length: " + length + " calc: " + calc + "Orientation: " + el.dataset.orientation1;
		document.getElementById("data").innerHTML += "<br/>ax: " + ax + " ay: " + ay + " has Bond: " + el.dataset.numBonds;
		document.getElementById("data").innerHTML += "<br/>bx: " + bx + " by: " + by;
		document.getElementById("data").innerHTML += "<br/>bond: offsetLeft" + bond.offsetLeft + " Top: " + bond.offsetTop;
	}
}

function mouseupAtom(e){
	window.removeEventListener("click", clickAtom);
	window.removeEventListener("mousemove", mousemoveAtom);
	window.removeEventListener("mouseup", mouseupAtom);
}

function moleculeDown(e) {

	if(!isResizing){
	el = e.target;
   window.addEventListener("mousemove", mousemoveMolecule);
   window.addEventListener("mouseup", mouseupMolecule);
   prevX = e.clientX;
   prevY = e.clientY;
	isDragging = true;
	isResizing = false;
	}
}

function mousedown(e) {

	if(!isResizing){
	el = e.target;
   window.addEventListener("mousemove", mousemoveBond);
   window.addEventListener("mouseup", mouseupBond);
   prevX = e.clientX;
   prevY = e.clientY;
	isDragging = true;
	isResizing = false;
	}
}

function mousedownEnd(e) {

	currentResizer = e.target;
	el=currentResizer.parentNode;
	window.addEventListener("mousemove", mousemoveEnd);
	window.addEventListener("mouseup", mouseupEnd);
	prevX = e.clientX;   //initialization
	prevY = e.clientY;
	isDragging = false;
	isResizing = true;
	haveBond = true;
}	

function mousemoveMolecule(e) {
	if(!isResizing && isDragging){
		atom1 = document.getElementById(el.dataset.end1);
		atom2 = document.getElementById(el.dataset.end2);
		let deltaX = prevX - e.clientX;
		let deltaY = prevY - e.clientY;
		//el.style.left = ax - deltaX + "px"; //Use this for tighter behaviour
		//el.style.top = ay - deltaY + "px";
		el.parentElement.style.left = el.parentElement.offsetLeft - deltaX + "px";
		el.parentElement.style.top = el.parentElement.offsetTop  - deltaY + "px";
		atom1.dataset.ax = atom1.dataset.ax - deltaX;
		atom1.dataset.ay = atom1.dataset.ay - deltaY;
		atom2.dataset.ax = atom2.dataset.ax - deltaX;
		atom2.dataset.ay = atom2.dataset.ay - deltaY;
		document.getElementById("data").innerHTML = "Dataset atom1 ax: " + atom1.dataset.ax + " ay: " + atom1.dataset.ay;
		document.getElementById("data").innerHTML += "atom2 ax: " + atom2.dataset.ax + " ay: " + atom2.dataset.ay;
		prevX = e.clientX;
		prevY = e.clientY;
	}
}

function mousemoveBond(e) {

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
		el.style.transformOrigin = "10px 0"; 
		//el.style.left = ax - deltaX + "px"; //Use this for tighter behaviour
		//el.style.top = ay - deltaY + "px";
		el.style.left = ax + "px";
		el.style.top = ay + "px";
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

	function mouseupMolecule(){
		window.removeEventListener("mousemove", mousemoveMolecule);
		window.removeEventListener("mouseup", mouseupMolecule);
		isResizing = false;
		isDragging = true;
	}

	function mousemoveEnd(e){
		if (isResizing) {
			ax = el.dataset.ax;
			ay = el.dataset.ay;
			bx = el.dataset.bx;
			by = el.dataset.by;
			currX = e.clientX; //Current pos
			currY = e.clientY;
			deltaX = currX - prevX;
			deltaY = currY - prevY;

			if (currentResizer.classList.contains("end2")) {
				bx = +bx + deltaX;
				by = +by + deltaY;
				currLength = Math.sqrt((ax - bx)*(ax - bx) + (ay - by)*(ay - by));
				el.style.transformOrigin = "10px 0px";
				
				calc = Math.atan((ax - bx)/(by - ay));
				raw = calc;
				calc = calc*180/Math.PI;
				if (by < ay)
					calc = calc + 180;
				el.style.height = currLength + "px";
				currentResizer.style.top = currLength - 50 + "px";		
				el.style.transform = ("rotate(" + calc +"deg)");
			}  else if (currentResizer.classList.contains("end1")) {
				ax = +ax + deltaX;
				ay = +ay + deltaY;
				currLength = Math.sqrt((ax - bx)*(ax - bx) + (ay - by)*(ay - by));
				el.style.transformOrigin = "10px 0px";
				calc = Math.atan((ay - by)/(ax - bx));
				calc = calc*180/Math.PI;
				if (bx <= ax)
					calc = calc - 180;
				calc = calc - 90;
				el.style.height = currLength + "px";
				el.style.transform = ("rotate(" + calc +"deg)");
				el.style.left = ax + "px";
				el.style.top = ay + "px";
				temp = document.getElementById(el.id + "end2");
				temp.style.top = currLength - 50 + "px";	
			}	
		prevX = currX;
		prevY = currY;
		bondSetData(el,ax,ay,bx,by);
		}
	}
	
	function mouseupEnd() {
	   window.removeEventListener("mousemove", mousemoveEnd);
		window.removeEventListener("mouseup", mouseupEnd);
		isDragging = false;
		isResizing = false;
		haveBond = false;
	}		
			
function bondSetData(el, a, b, c, d){
	el.dataset.ax = a;
	el.dataset.ay = b;
	el.dataset.bx = c;
	el.dataset.by = d;
}

