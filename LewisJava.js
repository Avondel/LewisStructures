function myFunction(){
	changeAtomButtons(true);
	//makeFunctionButton();
	//group1Function();
}

document.onclick= function(event) {
	if (!event.target.id.search("atom"))
		clickAtom(event);
	else if (event.target.nodeName == "BUTTON")
		x = 1;
	else if (!event.target.id.search("bond"))
		clickBond(event);
	else if (!event.target.id.search("pair"))
		clickPair(event);
	//else if (event.target.id.search("elec") > -1)
	//	clickChild(event);
		//document.getElementById("data").innerHTML = event.target.nodeName // placeholder to do nothing
	else
		resetAtoms();
}

/***************Bond Functions*/
function clickBond(event){
	deactivateEl();
	activeEl = event.target;
	but = document.getElementById("DeleteEl");
	but.disabled = false;
	if(isMoving)
		return;
	if(activeEl.dataset.type == 's'){
		activeEl.dataset.type = 'd';
		activeEl.setAttribute("class", "d " + "active");
	}
	else if(activeEl.dataset.type == 'd'){
		activeEl.dataset.type = 't';
		activeEl.setAttribute("class", "t " + "active");
	}
	else{
		activeEl.dataset.type = 's';
		activeEl.setAttribute("class", "s " + "active");
	}
}

function mouseDownBond(e) {
	if(!isResizing){
		el = e.target;
    window.addEventListener("mousemove", mousemoveBond);
    window.addEventListener("mouseup", mouseupBond);
    prevX = e.clientX;
    prevY = e.clientY;
	isDragging = true;
	isResizing = false;
	isMoving = false;
	}
}

function mousemoveBond(e) {		//We do not need to update the ax and ay because we are moving the div
	if(!isResizing && isDragging){
		isMoving = true
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

function mouseupBond(){
	window.removeEventListener("mousemove", mousemoveBond);
	window.removeEventListener("mouseup", mouseupBond);
	isResizing = false;
	isDragging = true;
	moveCount = 0;
}

/**************Pair Functions*/

function clickPair(event){
	but = document.getElementById("DeleteEl");
	but.disabled = false;
	if(moveCountElec > 20)
		return;
	if(activeEl.dataset.type=='p'){
		temp = document.getElementById(activeEl.id+'1');
		temp.remove();
		activeEl.dataset.type='s';
	}
	else{
		var elec1 = document.createElement("span");
		elec1.setAttribute("id",activeEl.id+"1");
		elec1.setAttribute("class","electron1");
		activeEl.appendChild(elec1);
		activeEl.dataset.type='p';
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
	pair.dataset.type = 'p';
	elec1.setAttribute("id",pair.id+"1");
	elec1.setAttribute("class","electron1");
	elec2.setAttribute("id",pair.id+"2");
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

function mousedownPair(e){
	e.cancelBubble = true;
	moveCountElec = 0;
	deactivateEl();
	activeEl = e.target;
	activeEl.setAttribute("class", "pair " + "active");
	atom1 = document.getElementById(activeEl.dataset.atom);	
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
	window.addEventListener("mousemove", mousemovePair);
    window.addEventListener("mouseup", mouseupPair);
	atomWidth = parseInt(getComputedStyle(atom1).width);
	atomPadding = parseInt(getComputedStyle(atom1).padding);
	radius = atomWidth/2 + atomPadding + 14;
	isMoving=false;
}

function mousemovePair(e){
	e.cancelBubble = true;
	moveCountElec = moveCountElec + 1;
	atomTemp.dataset.ax = e.clientX;
	atomTemp.dataset.ay = e.clientY;
	calc = getCalc(atomTemp, atomTemp2);
	calc2 = calc + 180;
	calc = calc + 90;
	let deltaX = (radius)*Math.cos(calc*2*Math.PI/360);
	let deltaY = (radius)*Math.sin(calc*2*Math.PI/360);
	activeEl.style.transform = "translate(" + deltaX + "px," + deltaY + "px)";
	activeEl.style.transform += " rotate(" + calc2 + "deg)";
}

function mouseupPair(){
	window.removeEventListener("mousemove", mousemovePair);
	window.removeEventListener("mouseup", mouseupPair);
	moveCount = 0;
}



/***********General Element Functions*/

function deleteEl(){
	if (!activeEl.id.search("atom"))
		deleteAtom();
	else if(!activeEl.id.search("bond")){
		atom = document.getElementById(activeEl.dataset.atom1);
		removeBond(atom.id,activeEl.id);
		atom = document.getElementById(activeEl.dataset.atom2);
		removeBond(atom.id,activeEl.id);
	}
	else{
		atom1 = document.getElementById(activeEl.dataset.atom);
		atom1.dataset.elecPairs = atom1.dataset.elecPairs - 1;
		activeEl.parentElement.removeChild(activeEl);
	}
}

function deactivateEl(){
	if(activeEl != null){
		if(!activeEl.id.search("atom"))
			activeEl.setAttribute("class", "nucleus " + activeEl.dataset.type);
		else if(!activeEl.id.search("pair"))
			activeEl.setAttribute("class", "pair");
		else if(!activeEl.id.search("bond"))
			if(activeEl.dataset.type=='s')
				activeEl.setAttribute("class", "s");
			else if(activeEl.dataset.type=='d')
				activeEl.setAttribute("class", "d");
			else
				activeEl.setAttribute("class", "t");
	}
}

/***********Ionize Function*/
function ionize(){
	document.getElementById("data").innerHTML = "ionize that!";
}

/***********Resonance Functions*/
function resonance(){
	document.getElementById("data").innerHTML = "We have resonance!";
}

/***********Molecule Functons*/
/*Move and such are under 'pair' functions*/

function clearMolecule(){
	var el = document.getElementById("Molecule");
	while (el.firstElementChild != null)
		el.removeChild(el.firstElementChild);
	count=0;
	resetAtoms();
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

function isConnected(atom1, atom2){
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

/***********General Function or those used in multiple places*/

function changeAtomButtons(stat){
	var but = document.getElementById("ElectronPair");
	but.disabled = stat;
	but = document.getElementById("DeleteEl");
	but.disabled = stat;
	if(document.getElementById("Change")){
		but = document.getElementById("Change");
		but.disabled = stat;
	}
}

function clickChild(event){
	event.cancelBubble = true;
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

function Help(){
	txt = "Create Atom: Click one of the element boxes.";
	txt += "\nMove Atom: Drag anywhere on the screen.";
	txt += "\nHighlight any element: Click and a gold border will appear.";
	txt += "\nCreat bond: Highlight first atom, then click the second atom.";
	txt += "\nDouble/Triple bonds: Click the bond. It will cycle throught single, double and triple bonds.";
	txt += "\nCreate Electrons: Highlight atom then click electrons button.";
	txt += "\nMove Electrons: Drag and they will rotate around atom.";
	txt += "\nSingle and Paired electrons: Click the electrons.";
	txt += "\nDelete any element: Highligh element, then click the Delete button.";
	txt += "\nRestart or Clear screen: Click the Clear/Restart button.";
	txt += "\nQuestions or suggestions: crigheimer@yahoo.com";
	alert(txt);
}

function listStyles(el){
	var styles = window.getComputedStyle(el);
	var styleList = "";
	for(var i = 0; i < 347; i = i + 1){
		styleList+=i + " " +styles[i]+"<br>";
	}
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
	//if(atom1 != null)
	//	atom1.setAttribute("class","nucleus " + atom1.dataset.type);
	//if(atom2 != null)
	//	atom2.setAttribute("class", "nucleus " + atom2.dataset.type);
	deactivateEl();
	activeEl = null;
	atom1 = null;
	atom2 = null;
}

