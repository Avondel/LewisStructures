function clearButtons(set){
	el = document.getElementById(set);
	while (el.firstElementChild != null)
		el.removeChild(el.firstElementChild);

}

function clearFunctionButtons(){
	document.getElementById("Change").style.visibility = "hidden";
}

function checkWork(){
	document.getElementById("data").innerHTML = "Work checked! You are good!";
}

function makeAtomButton(el){
	but = document.createElement("button");
	switch(el){
		case '1':but.setAttribute("onclick","CreateAtom('Hydrogen','H')"); but.innerHTML = "Hydrogen"; break;
		case '2':but.setAttribute("onclick","CreateAtom('Helium','He')"); but.innerHTML = "Helium"; break;
		case '3':but.setAttribute("onclick","CreateAtom('Lithium','Li')"); but.innerHTML = "Lithium"; break;
		case '4':but.setAttribute("onclick","CreateAtom('Beryllium','Be')"); but.innerHTML = "Beryllium"; break;
		case '6':but.setAttribute("onclick","CreateAtom('Carbon','C')"); but.innerHTML = "Carbon"; break;
		case '8':but.setAttribute("onclick","CreateAtom('Oxygen','O')"); but.innerHTML = "Oxygen"; break;
	}	

	document.getElementById("buttonAtom").appendChild(but);

}

function makeFunctionButton(){
	but = document.createElement("button");
	arr_but = [];

	//Check Work
	but.setAttribute("id","CheckWork");
	but.setAttribute("value","CheckWork");
	but.setAttribute("onclick","checkWork()");
	but.innerHTML = "Check";
	but.disabled = false;
	arr_but[0] = but;

	//Electrons
	but = document.createElement("button");
	but.setAttribute("id","ElectronPair");
	but.setAttribute("value","ElectronPair");
	but.setAttribute("onclick","createPair()");
	but.innerHTML = "Electrons";
	but.disabled = true;
	arr_but[1] = but;
	
	//Delete	
	but = document.createElement("button");
	but.setAttribute("id","DeleteEl");
	but.setAttribute("value","DeleteEl");
	but.setAttribute("onclick","deleteEl()");
	but.innerHTML = "Delete";
	but.disabled = true;
	arr_but[2] = but;
	
	//Change Atom
	but = document.createElement("button");
	but.setAttribute("id","Change");
	but.setAttribute("value","Change");
	but.setAttribute("onclick","differentAtom(event)");
	but.innerHTML = "ChangeAtom";
	but.disabled = true;
	arr_but[3] = but;
	
	//Ionize
	but = document.createElement("button");
	but.setAttribute("id","Ionize");
	but.setAttribute("value","Ionize");
	but.setAttribute("onclick","ionize()");
	but.innerHTML = "Ionize";
	but.disabled = false;
	arr_but[4] = but;
	
	//Resonance
	but = document.createElement("button");
	but.setAttribute("id","Resonance");
	but.setAttribute("value","Resonance");
	but.setAttribute("onclick","resonance()");
	but.innerHTML = "Resonance";
	but.disabled = false;
	arr_but[5] = but;
	
	//Restart
	but = document.createElement("button");
	but.setAttribute("id","Clear");
	but.setAttribute("value","Clear");
	but.setAttribute("onclick","clearMolecule()");
	but.innerHTML = "Clear/Restart";
	but.disabled = false;
	arr_but[6] = but;
}