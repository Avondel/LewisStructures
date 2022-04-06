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
		span_end1.dataset.bond1 = span_bond.id + "," + "s" + "," + "t" + "," + span_end2.id;
		bondArr = span_end1.dataset.bond1.split(',');
		span_end1.dataset.ax = ax;
		span_end1.dataset.ay = ay;
		span_end1.style.top = ay-50+"px";
		span_end1.style.left= ax -50+"px";
		span_end1.innerHTML = "Top";

		//Dataset for END2
		span_end2.dataset.bond1 = span_bond.id + "," + "s" + "," + "b" + "," +span_end1.id;
		bondArr2 = span_end2.dataset.bond1.split(',');
		span_end2.dataset.ax = bx;
		span_end2.dataset.ay = by;
		span_end2.style.top= ay + currLength -50 + "px";
		span_end2.style.left = ax -50 + "px";
		
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


function ListChildren(id){
	
	mol=document.getElementById(id);
	var c = mol.children;
	var txt = "";
	var i;
	if(c.length===0)
		txt = "no children";
	else
		for (i = 0; i < c.length; i++) {
			txt = txt + c[i].tagName + c[i].id+"<br>";
	}
	//document.getElementById("data").innerHTML = txt;
	alert(txt);
}

function mouseenterAtom(e){
	if(haveBond){
		curAtom = e.target;
		mol = document.getElementById("Molecule");
		curAtom.removeChild(currentResizer);
		curAtom.appendChild(el_atom);
		curAtom.style.top = 0 + "px";
		curAtom.style.left = 0 + "px";
		mouseupAtom();
		mouseupEnd();
		if (currentResizer.classList.contains("end2")){
			curAtom.classList.add("end2");
			curAtom.style.top = curAtom.parentElement.offsetHeight - curAtom.offsetWidth/2+"px";
			curAtom.style.left = -curAtom.offsetWidth/2 +7+ "px";
		}
		else
		{
			curAtom.classList.add("end1");
			curAtom.style.top = -curAtom.offsetHeight/2 + "px";
			curAtom.style.left = -curAtom.offsetWidth/2 + "px";
		}
		curAtom.addEventListener("mousedown",mousedownEnd);
   }
 }