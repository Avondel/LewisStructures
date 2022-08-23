function clickAtom(e){ 
	if(gotAtom==true && isMoving==false && atom2.id != atom1.id){ //create molecule
			if(!isConnected(atom2, atom1.id)){
				gotAtom = false;
				if( atom1.dataset.curBonds >= atom1.dataset.maxBonds || atom2.dataset.curBonds >= atom2.dataset.maxBonds){
					alert("You cannot add another bond.");
					return;
				}

			divSitch = isMolecule(atom1, atom2);			
			var newLine = document.createElement("span");
			count++;			
			switch(divSitch){
			case 1: //neither
				var moleculeBit = document.createElement("div"); //create
				moleculeBit.setAttribute("id","bit" + count);	//set attributes for molecule div
				moleculeBit.setAttribute("class", "Molecule");
				//moleculeBit.innerHTML = moleculeBit.id;
				
				document.getElementById("Molecule").appendChild(moleculeBit); //append	
				moleculeBit.appendChild(atom1);
				moleculeBit.appendChild(atom2);
				moleculeBit.appendChild(newLine);
				atom1.dataset.ax = atom1.dataset.ax - moleculeBit.offsetLeft;	//Reset ax ay for the new div
				atom1.dataset.ay = atom1.dataset.ay - moleculeBit.offsetTop;
				atom2.dataset.ax = atom2.dataset.ax - moleculeBit.offsetLeft;
				atom2.dataset.ay = atom2.dataset.ay - moleculeBit.offsetTop;

				atom1.style.top = atom1.dataset.ay - atom1.offsetHeight/2 + "px";
				atom1.style.left = atom1.dataset.ax - atom1.offsetWidth/2 + "px";
				
				atom2.style.top = atom2.dataset.ay - atom2.offsetHeight/2 + "px";
				atom2.style.left = atom2.dataset.ax - atom2.offsetWidth/2 + "px";
				break;
			case 2:
				moleculeBit = document.getElementById(atom2.parentElement.id);
				moleculeBit.appendChild(atom1);
				moleculeBit.appendChild(newLine);
			
				atom1.dataset.ax = atom1.dataset.ax - moleculeBit.offsetLeft;	//Reset ax ay for the new div
				atom1.dataset.ay = atom1.dataset.ay - moleculeBit.offsetTop;

				atom1.style.top = atom1.dataset.ay - atom1.offsetHeight/2 + "px";
				atom1.style.left = atom1.dataset.ax - atom1.offsetWidth/2 + "px";
				
				break;
			case 3:
				moleculeBit = document.getElementById(atom1.parentElement.id);
				moleculeBit.appendChild(atom2);
				moleculeBit.appendChild(newLine);
			
				atom2.dataset.ax = atom2.dataset.ax - moleculeBit.offsetLeft;
				atom2.dataset.ay = atom2.dataset.ay - moleculeBit.offsetTop;

				atom2.style.top = atom2.dataset.ay - atom2.offsetHeight/2 + "px";
				atom2.style.left = atom2.dataset.ax - atom2.offsetWidth/2 + "px";
				
				break;
			case 4:
				moleculeBit = document.getElementById(atom1.parentElement.id);
				moleculeBit.appendChild(newLine);
				break;
			case 5:
				moleculeBit = document.getElementById(atom1.parentElement.id);
				oldBit = document.getElementById(atom2.parentElement.id);
				moleculeBit.appendChild(newLine);
				
				var childElements = document.getElementById(oldBit.id).children;
				len = childElements.length;
				for (var i = 0; i < len; i++) {
					if(childElements[0].id.includes("atom")){
						childElements[0].dataset.ax = +childElements[0].dataset.ax + oldBit.offsetLeft - moleculeBit.offsetLeft;
						childElements[0].dataset.ay = +childElements[0].dataset.ay + oldBit.offsetTop - moleculeBit.offsetTop;
						childElements[0].style.top = childElements[0].dataset.ay - childElements[0].offsetHeight/2 + "px";
						childElements[0].style.left = childElements[0].dataset.ax - childElements[0].offsetWidth/2 + "px";
					}
					else{

						childElements[0].style.top = childElements[0].offsetTop + oldBit.offsetTop - moleculeBit.offsetTop + "px";
						childElements[0].style.left = childElements[0].offsetLeft + oldBit.offsetLeft - moleculeBit.offsetLeft + "px";
					}
					moleculeBit.appendChild(childElements[0]);
				}
				moleculeBit.parentElement.removeChild(oldBit);
				break;
			}
			//Calculate length and angle
			length = getLength(atom1, atom2);
			calc = getCalc(atom1,atom2);	
			//Create and style new bond
			newLine.setAttribute("id","bond"+count);
			newLine.setAttribute("class", "s");	
			newLine.style.transformOrigin = "10px 0px";
			newLine.style.top = atom2.dataset.ay + "px";
			newLine.style.left = atom2.dataset.ax - 7 + "px";
			newLine.style.height = length + "px";
			newLine.style.transform = ("rotate(" + calc +"deg)");
			newLine.dataset.atom1 = atom1.id;
			newLine.dataset.atom2 = atom2.id;
			newLine.dataset.type = 's';
			newLine.addEventListener("mousedown", mouseDownBond);
			//Insert bond into atoms
			insertBond(atom1,newLine.id,"s","b",atom2.id);
			insertBond(atom2,newLine.id,"s","t",atom1.id);
		}
		resetAtoms();
	}
	else if(!isMoving){ //needed so the atom does not highlight when being dragged
		gotAtom = true;
		atom1 = e.target;
		changeAtomButtons(false);
		atom1.setAttribute("class", "nucleus " + atom1.dataset.type + " active");
		if(atom2 != null && atom2 != atom1)
			atom2.setAttribute("class", "nucleus " + atom2.dataset.type);
	}
}

function CreateAtom(type, symbol){
	obj = 'Molecule';
	//alert(changeAtom);
	if( changeAtom ) {
		atom1.setAttribute("class", "nucleus " + type);
		atom1.innerHTML = symbol;
		atom1.dataset.type = type;
		atom1.style.top = atom1.dataset.ay - atom1.offsetHeight/2 + "px";
		atom1.style.left = atom1.dataset.ax - atom1.offsetWidth/2 + "px";
		changeAtom = false;
	}
	else
	{
		resetAtoms();
		//create atom
		count++; 
		var div_obj = document.getElementById(obj);
		//create and set attributes for the new Atom, atom1
		atom1 = document.createElement("span");
		atom1.setAttribute("id", "atom"+count);
		atom1.setAttribute("class", "nucleus " + type);
		atom1.dataset.bond1 = "o,o,o,o";
		atom1.dataset.bond2 = "o,o,o,o";
		atom1.dataset.bond3 = "o,o,o,o";
		atom1.dataset.bond4 = "o,o,o,o";
		atom1.dataset.bond5 = "o,o,o,o";
		atom1.dataset.bond6 = "o,o,o,o";
		atom1.dataset.bond7 = "o,o,o,o";
		atom1.dataset.bond8 = "o,o,o,o";
		atom1.dataset.maxBonds = 4;
		atom1.dataset.curBonds = 0;
		atom1.dataset.elecPairs = 0;
		atom1.dataset.type = type;
		atom1.innerHTML = symbol;
		atom1.style.top = 200 + "px";
		atom1.style.left = 500 + "px";
		atom1.addEventListener("mousedown", mousedownAtom);
		//append and style atom1
		div_obj.appendChild(atom1);
		atom1.dataset.ax = atom1.offsetWidth/2 + atom1.offsetLeft;
		atom1.dataset.ay = atom1.offsetHeight/2 + atom1.offsetTop;	
	}
}

function deleteAtom(){
	if(gotAtom == true){
		if( atom1.dataset.bond8[0] != 'o' ){
			arr = atom1.dataset.bond8.split(',');
			removeBond(arr[3],arr[0]);
		}
		if( atom1.dataset.bond7[0] != 'o' ){
			arr = atom1.dataset.bond7.split(',');
			removeBond(arr[3],arr[0]);
		}
		if( atom1.dataset.bond6[0] != 'o' ){
			arr = atom1.dataset.bond6.split(',');
			removeBond(arr[3],arr[0]);
		}
		if( atom1.dataset.bond5[0] != 'o' ){
			arr = atom1.dataset.bond5.split(',');
			removeBond(arr[3],arr[0]);
		}
		if( atom1.dataset.bond4[0] != 'o' ){
			arr = atom1.dataset.bond4.split(',');
			removeBond(arr[3],arr[0]);
		}
		if( atom1.dataset.bond3[0] != 'o' ){
			arr = atom1.dataset.bond3.split(',');
			removeBond(arr[3],arr[0]);
		}
		if( atom1.dataset.bond2[0] != 'o' ){
			arr = atom1.dataset.bond2.split(',');
			removeBond(arr[3],arr[0]);
		}
		if( atom1.dataset.bond1[0] != 'o' ){
			arr = atom1.dataset.bond1.split(',');
			removeBond(arr[3],arr[0]);
		}
		parentEl = atom1.parentElement;
		childEl = atom1.parentElement.firstElementChild;
		atom1.parentElement.removeChild(atom1);
		if( parentEl.firstElementChild == null )
			parentEl.parentElement.removeChild(parentEl);
		resetAtoms();
	}
}

function differentAtom(event){
	changeAtom = true;
	gotAtom = true;
	atom1.classList.add("change");
	//type = "none";
	//atom1.setAttribute("class", "nucleus " + type);
	//atom1.innerHTML = "None";
	//atom1.dataset.type = type;
	changeAtomButtons(true);
}

function mousedownAtom(e){
	deactivateEl();
	activeEl = e.target;
	activeEl.setAttribute("class", "nucleus " + activeEl.dataset.type + " active");
	if(gotAtom == true)
		atom2 = atom1;
	atom1 = e.target;
	
	window.addEventListener("mousemove", mousemoveAtom);
    window.addEventListener("mouseup", mouseupAtom);
	prevX = e.clientX;
    prevY = e.clientY;	
	isMoving=false;
}

function mousemoveAtom(e){
	if(moveCount > 20) //adjust senstitivity so user does not have to hold mouse absolutely still when connecting
		isMoving = true;
	moveCount++;
	gotAtom = false;	//Turn off active atom controls
	if(atom1 != null)
		atom1.setAttribute("class","nucleus " + atom1.dataset.type);
	if(atom2 != null)
		atom2.setAttribute("class","nucleus " + atom2.dataset.type);
	changeAtomButtons(true);
	
	ax = atom1.dataset.ax; //updates atom to be moved
	ay = atom1.dataset.ay;
	atom1.style.left =  atom1.offsetLeft - (prevX - e.clientX)+ "px";
	atom1.style.top = atom1.offsetTop - (prevY - e.clientY) + "px";
	atom1.dataset.ax = ax - (prevX - e.clientX);
	atom1.dataset.ay = ay - (prevY - e.clientY);
	prevX = e.clientX;
	prevY = e.clientY;
	
	switch(parseInt(atom1.dataset.maxBonds)){
		case 8:
			if(atom1.dataset.bond8[0]!='o'){
				//alert("Bond 8");
				bondArr = atom1.dataset.bond8.split(',');
				moveIndividualBond(atom1, bondArr);
			}
		case 7:
			if(atom1.dataset.bond7[0]!='o'){
				//alert("Bond 7");
				bondArr = atom1.dataset.bond7.split(',');
				moveIndividualBond(atom1, bondArr);
			}
		case 6:
			if(atom1.dataset.bond6[0]!='o'){
				//alert("Bond 6");
				bondArr = atom1.dataset.bond6.split(',');
				moveIndividualBond(atom1, bondArr);
			}
		case 5:
			if(atom1.dataset.bond5[0]!='o'){
				//alert("Bond 5");
				bondArr = atom1.dataset.bond5.split(',');
				moveIndividualBond(atom1, bondArr);
			}
		case 4:
			if(atom1.dataset.bond4[0]!='o'){
				//alert("Bond 4");
				bondArr = atom1.dataset.bond4.split(',');
				moveIndividualBond(atom1, bondArr);
			}
		case 3:
			if(atom1.dataset.bond3[0]!='o'){
				//alert("Bond 3");
				bondArr = atom1.dataset.bond3.split(',');
				moveIndividualBond(atom1, bondArr);
			}
		case 2:
			if(atom1.dataset.bond2[0]!='o'){
				//alert("Bond 2");
				bondArr = atom1.dataset.bond2.split(',');
				moveIndividualBond(atom1, bondArr);
			}
		case 1:
			if(atom1.dataset.bond1[0]!='o'){
				//alert("Bond 1");
				bondArr = atom1.dataset.bond1.split(',');
				moveIndividualBond(atom1, bondArr);
			}
	}
}


function mouseupAtom(e){
	//window.removeEventListener("click", clickAtom); //cannot remove this since it is not added
	window.removeEventListener("mousemove", mousemoveAtom);
	window.removeEventListener("mouseup", mouseupAtom);
	moveCount = 0;
}

function insertBond(atom, bond, type, orientation, atom2){
	atom.dataset.curBonds++;
	//atom2El = document.getElementById(atom2);
	bondEl = document.getElementById(bond);

	switch(parseInt(atom.dataset.maxBonds)){
		case 8:
			if(atom.dataset.bond8[0]=='o'){
				//alert("8");
				atom.dataset.bond8 = bond+','+type+','+orientation+','+atom2;
				break;
			}
		case 7:
			if(atom.dataset.bond7[0]=='o'){
				//alert("7");
				atom.dataset.bond7 = bond+','+type+','+orientation+','+atom2;
				break;
			}
		case 6:
			if(atom.dataset.bond6[0]=='o'){
				//alert("6");
				atom.dataset.bond6 = bond+','+type+','+orientation+','+atom2;
				break;
			}
		case 5:
			if(atom.dataset.bond5[0]=='o'){
				//alert("5");
				atom.dataset.bond5 = bond+','+type+','+orientation+','+atom2;
				break;
			}
		case 4:
			if(atom.dataset.bond4[0]=='o'){
				//alert("4");
				atom.dataset.bond4 = bond+','+type+','+orientation+','+atom2;
				break;
			}
		case 3:
			if(atom.dataset.bond3[0]=='o'){
				//alert("3");
				atom.dataset.bond3 = bond+','+type+','+orientation+','+atom2;
				break;
			}
		case 2:
			if(atom.dataset.bond2[0]=='o'){
				//alert("2");
				atom.dataset.bond2 = bond+','+type+','+orientation+','+atom2;
				break;
			}			
		case 1:
			if(atom.dataset.bond1[0]=='o'){
				//alert("1");
				atom.dataset.bond1 = bond+','+type+','+orientation+','+atom2;
				break;
			}				
		default:
			alert("You cannot add another bond");
	}
}

function moveIndividualBond(el, bondArr){
	atom2 = document.getElementById(bondArr[3]);
	bond = document.getElementById(bondArr[0]);
	length = getLength(el,atom2);
	calc = getCalc(el,atom2);
	bond.style.height = length + "px";
	if (bondArr[2] == 't') {
		calc = calc + 180;
		bond.style.top = ay + "px";
		bond.style.left = ax -10 + "px";
	}
	bond.style.transform = ("rotate(" + calc + "deg)");
}