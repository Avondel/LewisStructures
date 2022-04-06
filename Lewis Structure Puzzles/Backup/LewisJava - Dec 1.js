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
		span_obj.dataset.bond1 = "o,o,o,o";
		span_obj.dataset.bond2 = "o,o,o,o";
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
		document.getElementById("data").innerHTML = "<br/>Create Atom";
}

function CreateBond(obj, ax, ay, bx, by){ // created as a molecule bit
		count++;	
		//create new HTML elements
      var div_obj = document.getElementById(obj);
		var moleculeBit = document.createElement("div");
		var span_bond = document.createElement("span");
		var span_end1 = document.createElement("span");
		var span_end2 = document.createElement("span");
		var id = "bond" + count;
		
		//Calculations
		currLength=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by)); // Do calculations
		calc=Math.atan((ax-bx)/(by-ay));
		calc=calc*180/Math.PI;
		if (ay > by)
			calc = calc + 180;
		
		//Append Elements
      div_obj.appendChild(moleculeBit);
    	moleculeBit.appendChild(span_bond);
		moleculeBit.appendChild(span_end1);
		moleculeBit.appendChild(span_end2);

		
		ax = ax - moleculeBit.offsetLeft;
		ay = ay - moleculeBit.offsetTop;
		bx = bx - moleculeBit.offsetLeft;
		by = by - moleculeBit.offsetTop;
		
	   //Attributes for LINE
		span_bond.setAttribute("id", id);
		span_bond.setAttribute("class","bond");
		span_bond.style.height = currLength + "px";
		span_bond.addEventListener("mousedown",moleculeDown);
		span_bond.style.left = ax -10 + "px";
		span_bond.style.top = ay + "px";

		//Attributes for ENDS
		span_end1.setAttribute("id",id+"end1");
		span_end1.setAttribute("class","resizer end1");
		span_end2.setAttribute("id",id+"end2");
		span_end2.setAttribute("class","resizer end2");
		
		//Dataset for END1
		span_end1.dataset.numBonds = 1;
		span_end1.dataset.bond1 = span_bond.id + "," + "s" + "," + "t" + "," + span_end2.id;
		bondArr = span_end1.dataset.bond1.split(',');
		span_end1.dataset.ax = ax;
		span_end1.dataset.ay = ay;
		span_end1.style.top = ay-50+"px";
		span_end1.style.left= ax -50+"px";
		span_end1.innerHTML = "Top";
		document.getElementById("data").innerHTML = span_end1.dataset.bond1;
		document.getElementById("data").innerHTML += "<br>" + bondArr[0] + " " + bondArr[1] + " " + bondArr[2] + " " + bondArr[3];

		//Dataset for END2
		span_end2.dataset.numBonds = 1;
		span_end2.dataset.bond1 = span_bond.id + "," + "s" + "," + "b" + "," +span_end1.id;
		bondArr2 = span_end2.dataset.bond1.split(',');
		span_end2.dataset.ax = bx;
		span_end2.dataset.ay = by;
		span_end2.style.top= ay + currLength -50 + "px";
		span_end2.style.left = ax -50 + "px";
		document.getElementById("data").innerHTML += "<br>" + span_end2.dataset.bond1;
		document.getElementById("data").innerHTML += "<br>" + bondArr2[0] + " " + bondArr2[1] + " " + bondArr2[2] + " " + bondArr2[3]
		
		//Rotate bond
		span_bond.style.transformOrigin = "10px 0px";
		span_bond.style.transform = ("rotate(" + calc +"deg)");

		moleculeBit.setAttribute("id", "bit" + count);
		moleculeBit.setAttribute("class", "Molecule");
      span_bond.dataset.end1 = span_end1.id;
		span_bond.dataset.end2 = span_end2.id;
		span_end1.style.cursor = "grabbing";
		span_end1.addEventListener("mousedown",mousedownAtom);
		span_end2.style.cursor = "grabbing";
		span_end2.addEventListener("mousedown",mousedownAtom);
   }

function mousedownAtom(e){
	el = e.target;
	window.addEventListener("mousemove", mousemoveAtom);
   window.addEventListener("mouseup", mouseupAtom);
	prevX = e.clientX;
   prevY = e.clientY;	
}

function clickAtom(e){ 

	document.getElementById("data").innerHTML = "Got atom: " + gotAtom + " atom1: " + atom1.id + " e.target: " + e.target.id;
	if(gotAtom==true && e.target.id != atom1.id){ //create molecule
		bondArr2 = e.target.dataset.bond1.split(",");
		if(bondArr2[3] == atom1.id){}
			//alert("Connected!");
		else{
		var moleculeBit = document.createElement("div"); //create
		var newLine = document.createElement("span");
		atom2 = e.target;
		count++;
		
		document.getElementById("PlayArea").appendChild(moleculeBit); //append
		moleculeBit.appendChild(atom1);
		moleculeBit.appendChild(atom2);
		moleculeBit.appendChild(newLine);
		
		moleculeBit.setAttribute("id","bit" + count);	//set attributes for molecule div
		moleculeBit.setAttribute("class", "Molecule");
		
		ax = atom1.dataset.ax - newLine.parentElement.offsetLeft;	//Reset ax ay for the new div
		ay = atom1.dataset.ay - newLine.parentElement.offsetTop;
		bx = atom2.dataset.ax - newLine.parentElement.offsetLeft;
		by = atom2.dataset.ay - newLine.parentElement.offsetTop;
		
		atom1.dataset.ax = ax;
		atom1.dataset.ay = ay;
		atom2.dataset.ax = bx;
		atom2.dataset.ay = by;
		
		length = Math.sqrt((bx - ax)*(bx - ax) + (by - ay) * (by - ay)); // calculations
		calc = Math.atan((ax - bx)/(by - ay));
		calc = calc * 180/Math.PI;
		if (ay <= by)
			calc = calc - 180;
		
		document.getElementById("data").innerHTML = "Atom1: " + atom1.innerHTML + " ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by;
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
		
		atom1.dataset.bond1 = newLine.id + "," + "s" + "," + "b" + "," + atom2.id;
		atom1.style.top = ay - atom1.offsetHeight/2 + "px";
		atom1.style.left = ax - atom1.offsetWidth/2 + "px";
		
		atom2.dataset.bond1 = newLine.id + "," + "s" + "," + "t" + "," + atom1.id;
		atom2.style.top = by - atom2.offsetHeight/2 + "px";
		atom2.style.left = bx - atom2.offsetWidth/2 + "px";
		gotAtom = false;
		bondArr1 = atom1.dataset.bond1.split(",");
		bondArr2 = atom2.dataset.bond1.split(",");
		document.getElementById("data").innerHTML += atom1.dataset.bond1;
		document.getElementById("data").innerHTML += "<br>"+bondArr1[0]+" "+bondArr1[1]+" "+bondArr1[2]+" "+bondArr1[3];
		document.getElementById("data").innerHTML += "<br>"+atom2.dataset.bond1;
		document.getElementById("data").innerHTML += "<br>"+bondArr2[0]+" "+bondArr2[1]+" "+bondArr2[2]+" "+bondArr2[3];
		}
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
			el_atom.style.left = -el_atom.offsetWidth/2 + "px";
		}
		el_atom.addEventListener("mousedown",mousedownEnd);
   }
 		document.getElementById("data").innerHTML = "ax: " + span_obj.dataset.ax + " ay: " + span_obj.dataset.ay;
		document.getElementById("data").innerHTML += "<br/>mouse enter Atom";
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
	document.getElementById("data").innerHTML = "ax: " + el.dataset.ax + " ay: " + el.dataset.ay;
	document.getElementById("data").innerHTML += "mouse move Atom";
	if ( el.dataset.numBonds > 0 ){
		bondArr1 = el.dataset.bond1.split(',');
		atom1 = bondArr1[3];
		bond1 = bondArr1[0];
		//alert(atom1 + " " + bond1);
		atom2 = document.getElementById(atom1);
		bond = document.getElementById(bond1);
		bx = atom2.dataset.ax;
		by = atom2.dataset.ay;
		length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
		calc=Math.atan((ax-bx)/(by-ay));
		calc=calc*180/Math.PI;

		if(ay < by)
			calc = calc + 180;
		bond.style.height = length + "px";
		if (bondArr1[2] == 't') {
			bond.style.top = ay + "px";
			bond.style.left = ax -10 + "px";
			calc = calc - 180;
		}
		bond.style.transform = ("rotate(" + calc + "deg)");
	}

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
	document.getElementById("data").innerHTML = "ax: " + el.dataset.end1 + " : " + el.dataset.end2;
	document.getElementById("data").innerHTML += "<br/>molecule Down";
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
		//We do not need to update the ax and ay because we are moving the div
		document.getElementById("data").innerHTML = "Dataset atom1 ax: " + atom1.dataset.ax + " ay: " + atom1.dataset.ay;
		document.getElementById("data").innerHTML += "atom2 ax: " + atom2.dataset.ax + " ay: " + atom2.dataset.ay;
		prevX = e.clientX;
		prevY = e.clientY;
	}
	document.getElementById("data").innerHTML = "ax: " + span_obj.dataset.ax + " ay: " + span_obj.dataset.ay;
	document.getElementById("data").innerHTML += "<br/>mouse move Molecule";
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
		alert("Move Bond");
	}
}
		
	function mouseupBond(){
		window.removeEventListener("mousemove", mousemoveBond);
		window.removeEventListener("mouseup", mouseupBond);
		isResizing = false;
		isDragging = true;
	}
	
	function mouseupAtom(e){
	window.removeEventListener("click", clickAtom);
	window.removeEventListener("mousemove", mousemoveAtom);
	window.removeEventListener("mouseup", mouseupAtom);
}

	function mouseupMolecule(){
		window.removeEventListener("mousemove", mousemoveMolecule);
		window.removeEventListener("mouseup", mouseupMolecule);
		isResizing = false;
		isDragging = true;
	}

