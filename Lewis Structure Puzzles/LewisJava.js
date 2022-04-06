let isDragging = false;
let isResizing = false;
let isMoving = false;
let changeAtom = false;
let gotAtom = false;
let moveOrigin = false;
let moveCount = 0;
let count = 0;
let atom1 = null; //current atom
let atom2 = null;
let pairAct = null;

function myFunction(){
	changeAtomButtons(true);
}

document.onclick= function(event) {
	//document.getElementById("data").innerHTML = "";
	if (!event.target.id.search("atom"))
		clickAtom(event);
	else if (event.target.nodeName == "BUTTON")
		x = 1;
	//else if (event.target.id.search("elec") > -1)
	//	clickChild(event);
		//document.getElementById("data").innerHTML = event.target.nodeName // placeholder to do nothing
	else
		resetAtoms();
};

function clearMolecule(){
	var el = document.getElementById("Molecule");
	while (el.firstElementChild != null)
		el.removeChild(el.firstElementChild);
	count=0;
}

function mousedownPair(e){
	e.cancelBubble = true;
	pairAct = e.target;
	atom1 = document.getElementById(pairAct.dataset.atom);	
	atomParent = atom1.parentElement;
	//alert(atomParent.id);
	atomTemp = document.createElement("span");
	atomTemp2 = document.createElement("span");
	atomTemp2.dataset.ax = atom1.dataset.ax;
	atomTemp2.dataset.ay = atom1.dataset.ay;

	if(atomParent.id != "Molecule"){
		atomTemp2.dataset.ax = parseInt(atomTemp2.dataset.ax) + parseInt(atomParent.offsetLeft);
		atomTemp2.dataset.ay = parseInt(atomTemp2.dataset.ay) + parseInt(atomParent.offsetTop);
	}
	document.getElementById("data").innerHTML = "atomTemp2: " + atomTemp2.dataset.ax + " " + atomTemp2.dataset.ay;
	document.getElementById("data").innerHTML += "atom1: " + atom1.dataset.ax;
	window.addEventListener("mousemove", mousemovePair);
    window.addEventListener("mouseup", mouseupPair);
	atomWidth = parseInt(getComputedStyle(atom1).width);
	atomPadding = parseInt(getComputedStyle(atom1).padding);
	radius = atomWidth/2 + atomPadding + 14;
	//alert(radius);
	isMoving=false;
}

function mousemovePair(e){
	e.cancelBubble = true;
	atomTemp.dataset.ax = e.clientX;
	atomTemp.dataset.ay = e.clientY;
	calc = getCalc(atomTemp, atomTemp2);
	calc2 = calc + 180;
	calc = calc + 90;
	let deltaX = (radius)*Math.cos(calc*2*Math.PI/360);
	let deltaY = (radius)*Math.sin(calc*2*Math.PI/360);
	pairAct.style.transform = "translate(" + deltaX + "px," + deltaY + "px)";
	pairAct.style.transform += " rotate(" + calc2 + "deg)";

}

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
				moleculeBit.innerHTML = moleculeBit.id;
				
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
			newLine.setAttribute("class", "bond");	
			newLine.style.transformOrigin = "10px 0px";
			newLine.style.top = atom2.dataset.ay + "px";
			newLine.style.left = atom2.dataset.ax - 8 + "px";
			newLine.style.height = length + "px";
			newLine.style.transform = ("rotate(" + calc +"deg)");
			newLine.dataset.end1 = atom1.id;
			newLine.dataset.end2 = atom2.id;
			newLine.addEventListener("mousedown", mouseDownMolecule);
			
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

function clickChild(event){
	event.cancelBubble = true;
}

function CreateAtom(obj, type, symbol){
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
		//atom1.innerHTML = symbol;
		atom1.innerHTML = count;
		atom1.addEventListener("mousedown", mousedownAtom);

		//append and style atom1
		div_obj.appendChild(atom1);
		atom1.dataset.ax = atom1.offsetWidth/2 + atom1.offsetLeft;
		atom1.dataset.ay = atom1.offsetHeight/2 + atom1.offsetTop;	
	}
}

function createPair(){
	var pair = document.createElement("span");
	var elec1 = document.createElement("span");
	var elec2 = document.createElement("span");
	var styles = getComputedStyle(atom1);
	var atomSize = styles.width;
	var padding = window.getComputedStyle(atom1, null).getPropertyValue('padding-left')
	atomSize = atomSize.replace(/[^\d.-]/g,''); 
	padding = padding.replace(/[^\d.-]/g,'');
	atomSize = parseInt(atomSize)/2 + parseInt(padding);
	count++;
	pair.setAttribute("id", "pair"+count);
	pair.setAttribute("class", "pair");
	pair.dataset.atom = atom1.id;
	elec1.setAttribute("class","electron1");
	elec2.setAttribute("class","electron2");
	pair.addEventListener("mousedown", mousedownPair);
	elec1.addEventListener("mousedown", clickChild);
	elec1.addEventListener("mousemove", clickChild);
	elec2.addEventListener("mousedown", clickChild);
	elec2.addEventListener("mousemove", clickChild);

	pair.style.top = atomSize -14 + "px";
	pair.style.left = atomSize - 25 + "px";
	pair.appendChild(elec1);
	pair.appendChild(elec2);
	switch(parseInt(atom1.dataset.elecPairs)){
		case 0:
			pair.style.transform = " translate(" + 0 + "px," + -(atomSize+14) + "px)";
			pair.dataset.calc = "180";
			break;
		case 1:
			pair.style.transform = "translate(" + (parseInt(atomSize)+parseInt(14)) + "px, " + 0 + "px)";
			pair.style.transform += "rotate(90deg)";
			pair.dataset.calc = "270";
			break;
		case 2:
			pair.style.transform = "translate(" + 0 + "px, " + (parseInt(atomSize) + parseInt(14)) + "px) ";
			pair.style.transform += "rotate(180deg)";
			pair.dataset.calc = "0";
			break;
		case 3:
			pair.style.transform = "translate(" + -(atomSize +parseInt(14)) + "px, " + 0 +"px)";
			pair.style.transform += "rotate(270deg)";
			pair.dataset.calc = "90";
	}
	atom1.appendChild(pair);
	atom1.dataset.elecPairs++;

}

function deleteAtom(e){
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
	type = "none";
	atom1.setAttribute("class", "nucleus " + type);
	atom1.innerHTML = "None";
	atom1.dataset.type = type;
	changeAtomButtons(true);
}

function mousedownAtom(e){
	if(gotAtom == true)
		atom2 = atom1;
	atom1 = e.target;
	
	window.addEventListener("mousemove", mousemoveAtom);
    window.addEventListener("mouseup", mouseupAtom);
	prevX = e.clientX;
    prevY = e.clientY;	
	isMoving=false;
}



function mouseDownMolecule(e) {
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



function mousemoveMolecule(e) {		//We do not need to update the ax and ay because we are moving the div
	if(!isResizing && isDragging){
		let deltaX = prevX - e.clientX;
		let deltaY = prevY - e.clientY;
		//el.style.left = ax - deltaX + "px"; //Use this for tighter behaviour
		//el.style.top = ay - deltaY + "px";
		el.parentElement.style.left = el.parentElement.offsetLeft - deltaX + "px";
		el.parentElement.style.top = el.parentElement.offsetTop  - deltaY + "px";
		prevX = e.clientX;
		prevY = e.clientY;
	}
}

function mouseupAtom(e){
	//window.removeEventListener("click", clickAtom); //cannot remove this since it is not added
	window.removeEventListener("mousemove", mousemoveAtom);
	window.removeEventListener("mouseup", mouseupAtom);
	moveCount = 0;
}

function mouseupPair(){
	window.removeEventListener("mousemove", mousemovePair);
	window.removeEventListener("mouseup", mouseupPair);
	moveCount = 0;
}

function mouseupMolecule(){
	window.removeEventListener("mousemove", mousemoveMolecule);
	window.removeEventListener("mouseup", mouseupMolecule);
	isResizing = false;
	isDragging = true;
	moveCount = 0;
}

function isConnected(atom1, atom2)
{
	//bond 1
	arr = atom1.dataset.bond1.split(',');
	if(arr[3] == atom2)
		return true;
	
	//bond2
	arr = atom1.dataset.bond2.split(',');
	if(arr[3] == atom2)
		return true;
	
	//bond3
	arr = atom1.dataset.bond3.split(',');
	if(arr[3] == atom2)
		return true;
	
	//bond4
	arr = atom1.dataset.bond4.split(',');
	if(arr[3] == atom2)
		return true;
	
	//bond5
	arr = atom1.dataset.bond5.split(',');
	if(arr[3] == atom2)
		return true;
	
	//bond6
	arr = atom1.dataset.bond6.split(',');
	if(arr[3] == atom2)
		return true;
	
	//bond7
	arr = atom1.dataset.bond7.split(',');
	if(arr[3] == atom2)
		return true;
	
	//bond 8		
	arr = atom1.dataset.bond8.split(',');
	if(arr[3] == atom2)
		return true;
	
	return false;
}

function isMolecule(atom1, atom2){
	if(atom1.parentElement.id == "Molecule" && atom2.parentElement.id == "Molecule")
		return 1;
	else if(atom1.parentElement.id == "Molecule" && atom2.parentElement.id != "Molecule")
		return 2;
	else if(atom1.parentElement.id != "Molecule" && atom2.parentElement.id == "Molecule")
		return 3;
	else if(atom1.parentElement.id == atom2.parentElement.id)
		return 4;
	else
		return 5;
}

function getCalc(atom1, atom2){
	ax = Number(atom1.dataset.ax);
	ay = Number(atom1.dataset.ay);
	bx = Number(atom2.dataset.ax);
	by = Number(atom2.dataset.ay);
	calc = Math.atan((ax - bx)/(by - ay));
	calc = calc * 180/Math.PI;
	if (ay <= by)
	{
		test180 = "in 180";
		calc = calc + 180;
	}
	//document.getElementById("data").innerHTML = "ax: " + ax + " ay: " + ay + " bx: " + bx + " by: " + by + " calc: " + calc;
	return calc;
}

function getLength(atom1, atom2){
	ax = atom1.dataset.ax;
	ay = atom1.dataset.ay;
	bx = atom2.dataset.ax;
	by = atom2.dataset.ay;
	length = Math.sqrt((ax - bx)*(ax - bx) + (ay - by)*(ay - by));
	return length;
}

function changeAtomButtons(stat){
	var but = document.getElementById("ElectronPair");
	but.disabled = stat;
	but = document.getElementById("Delete");
	but.disabled = stat;
	but = document.getElementById("Change");
	but.disabled = stat;
}


function insertBond(atom, bond, type, orientation, atom2){
	atom.dataset.curBonds++;
	atom2El = document.getElementById(atom2);
	//alert("atom1: " + atom.id + " atom2 " + atom2);
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
	//ay = atom2.dataset.ay;
	//ax = atom2.dataset.ax;
	bond = document.getElementById(bondArr[0]);
	length = getLength(el,atom2);
	calc = getCalc(el,atom2);
	bond.style.height = length + "px";
	if (bondArr[2] == 't') {
		calc = calc + 180;
		bond.style.top = ay + "px";
		bond.style.left = ax -10 + "px";
	}
	//document.getElementById("data").innerHTML = "atom2: " + atom2.id + " bondArr: " + bondArr;
	bond.style.transform = ("rotate(" + calc + "deg)");
}

function removeBond( atomId, bondId){
	atomEl = document.getElementById(atomId);
	arr = atomEl.dataset.bond1.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond1="o,o,o,o";
	arr = atomEl.dataset.bond2.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond2="o,o,o,o";
	arr = atomEl.dataset.bond3.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond3="o,o,o,o";
	arr = atomEl.dataset.bond4.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond4="o,o,o,o";
	arr = atomEl.dataset.bond5.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond5="o,o,o,o";
	arr = atomEl.dataset.bond6.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond6="o,o,o,o";
	arr = atomEl.dataset.bond7.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond7="o,o,o,o";
	arr = atomEl.dataset.bond8.split(',');
	if(arr[0]==bondId)
		atomEl.dataset.bond8="o,o,o,o";
	atomEl.dataset.curBonds--;
	bondEl = document.getElementById(bondId);
	atomEl.parentElement.removeChild(bondEl);
}

function resetAtoms(){
	isDragging = false;
	isResizing = false;
	isMoving = false;
	changeAtom = false;
	gotAtom = false;
	changeAtomButtons(true);
	if(atom1 != null)
		atom1.setAttribute("class","nucleus " + atom1.dataset.type);
	if(atom2 != null)
		atom2.setAttribute("class", "nucleus " + atom2.dataset.type);
	atom1 = null;
	atom2 = null;
}

function listStyles(el){
	var styles = window.getComputedStyle(el);
	var styleList = "";
	for(var i = 0; i < 347; i = i + 1){
		styleList+=i + " " +styles[i]+"<br>";
	}
}