var score=0;
var playGame=true;
var img_src=[];
var boardFull = 0;
var move = 1;
var currChild= 0;
var tableEl;
var secArr = [];

document.addEventListener("keydown",play2048);

function tempTest(){
	container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);
}

async function init(){
	score = 0;
	playGame = true;

	img_src[0] = "img/skin1.png";
	img_src[1] = "img/mucus1.png";
	img_src[2] = "img/mast1.png";
	img_src[3] = "img/neutrophil1.png";
	img_src[4] = "img/macrophage1.png";
	img_src[5] = "img/NaturalKiller1.png";
	img_src[6] = "img/bCell1.png";
	img_src[7] = "img/HelperTCell1.png";
	img_src[8] = "img/KillerTCell1.png";
	img_src[9] = "img/MemoryCell1.png";
	img_src[10] = "img/Immunity1.png";
	
	createImage();
	moveImages(notice);
}

function anim(){
	el = document.getElementById('c3r1').firstChild;
	container = document.getElementById('c1r1');
	container2 = document.getElementById('c2r1');
	container.appendChild(el);
	el2 = document.getElementById('c3r1').firstChild;
	container2.appendChild(el2);
	el.style.left = '200px';
	el2.style.left = '100px';
	
	container.firstChild.style.animation = "moveLeft2 1s forwards";
	container2.firstChild.style.animation = "moveLeft2 1s forwards";
	notice(el);
	container.firstChild.style.animation = "moveDown 1s forwards";
}


function trans(){
	el = document.getElementById('c3r1').firstChild;
	container = document.getElementById('c1r1');
	container2 = document.getElementById('c2r1');
	container.appendChild(el);

	el.style.left = "200px";
	el2 = document.getElementById('c3r1').firstChild;
	//el.style.transition = "left 1s";
	el.style.left = "0px";
	//container.appendChild(el);
	

}
async function play2048(e){
	secArr = [];
	if(playGame){
		move = 0;
		if(e.key =="ArrowLeft")
			arrowLeft();
		else if(e.key =="ArrowRight")
			arrowRight();
		else if(e.key == "ArrowUp")
			arrowUp();
		else if(e.key == "ArrowDown")
			arrowDown();
		else
			return;

		moveImages(notice);
		isEndGame(playGame);
	}
}

function isEndGame(playGame){
		if(isBoardFull()){
			move = gotMove();
			if(!move){
				playGame = false;
				alert("game over");
			}
		}
	
}

async function arrowLeft(){
	move = 0;
	for(var row=1; row<=4; row++){
		secArr = [];
		//read into secondary array
		var i = 0;
		for(var col = 1; col<=4; col++){
			if(document.getElementById('c'+col+'r'+row).firstChild){
				currChild = document.getElementById('c'+col+'r'+row).firstChild;
				secArr[i] = currChild;
				document.getElementById('c'+col+'r'+row).removeChild(currChild);
				i++;
			}
		}
		//find combos
		findCombos(secArr);

		col = 1;
		//put back into cells
		for(var i = 0; i<secArr.length; i++){
			document.getElementById('c'+col+'r'+row).appendChild(secArr[i]);
			if(secArr[i].dataset.anim == 'c'){
				document.getElementById('c'+col+'r'+row).appendChild(secArr[i+1]);
				i++;
			}
			col++;
		}

		//format properly
		for(var col = 1; col<=4; col++){
			if(el = document.getElementById('c'+col+'r'+row).firstChild){
				if(el.dataset.anim == 'l'){
					dist = el.dataset.x - col;
					if(dist == 0){
						el.dataset.anim == '';
					}
					else{
						move = 1;
						el.style.left = dist*113 +'px';
					}
				}
				else if(el.dataset.anim == 'c'){
					move = 1;
					el2 = el.nextSibling;
					dist = el2.dataset.x - col;
					el2.style.left = dist*113 + 'px';
				}
			}
		}
	}
}

async function arrowRight(){
	for(var row=1; row<=4; row++){
	//read into secondary array
		var i = 0;
		secArr = [];
		for(var col = 4; col>=1; col--){
			if(document.getElementById('c'+col+'r'+row).firstChild){
				currChild = document.getElementById('c'+col+'r'+row).firstChild;
				secArr[i] = currChild;
				document.getElementById('c'+col+'r'+row).removeChild(currChild);
				i++;
			}
			
		}
		//find combos
		findCombos(secArr);

		col = 4;
		//put back into cells
		for(var i = 0; i<secArr.length; i++){
			document.getElementById('c'+col+'r'+row).appendChild(secArr[i]);
			if(secArr[i].dataset.anim == 'c'){
				document.getElementById('c'+col+'r'+row).appendChild(secArr[i+1]);
				i++;
			}
			col--;
		}

		//format properly
		for(var col = 1; col<=4; col++){
			if(el = document.getElementById('c'+col+'r'+row).firstChild){
				if(el.dataset.anim == 'l'){
					dist = el.dataset.x - col;
					if(dist == 0){
						el.dataset.anim == '';
					}
					else{
						el.style.left = dist*113 +'px';
						move=1;
					}
				}
				else if(el.dataset.anim == 'c'){
					move=1;
					el2 = el.nextSibling;
					dist = el2.dataset.x - col;
					el2.style.left = dist*113 + 'px';
				}
			}
		}
	}
}

async function arrowDown(){
	for(var col=1; col<=4; col++){
	//read into secondary array
		var i = 0;
		secArr = [];
		for(var row = 4; row>=1; row--){
			if(document.getElementById('c'+col+'r'+row).firstChild){
				currChild = document.getElementById('c'+col+'r'+row).firstChild;
				secArr[i] = currChild;
				document.getElementById('c'+col+'r'+row).removeChild(currChild);
				i++;
			}
			
		}
		//find combos
		findCombos(secArr);

		row = 4;
		//put back into cells
		for(var i = 0; i<secArr.length; i++){
			document.getElementById('c'+col+'r'+row).appendChild(secArr[i]);
			if(secArr[i].dataset.anim == 'c'){
				document.getElementById('c'+col+'r'+row).appendChild(secArr[i+1]);
				i++;
			}
			row--;
		}
		//format properly
		for(var row = 1; row<=4; row++){
			if(el = document.getElementById('c'+col+'r'+row).firstChild){
				if(el.dataset.anim == 'l'){
					dist = el.dataset.y - row;
					if(dist == 0){
						el.dataset.anim == '';
					}
					else{
						el.style.top = dist*113 +'px';
						move = 1;
					}
				}
				else if(el.dataset.anim == 'c'){
					move = 1;
					el2 = el.nextSibling;
					dist = el2.dataset.y - row;
					el2.style.top = dist*113 + 'px';
				}
			}
		}
	}
}

async function arrowUp(){
	for(var col=1; col<=4; col++){
	//read into secondary array
		var i = 0;
		secArr = [];
		for(var row = 1; row<=4; row++){
			if(document.getElementById('c'+col+'r'+row).firstChild){
				currChild = document.getElementById('c'+col+'r'+row).firstChild;
				secArr[i] = currChild;
				document.getElementById('c'+col+'r'+row).removeChild(currChild);
				i++;
			}
			
		}
		//find combos
		findCombos(secArr);

		row = 1;
		//put back into cells
		for(var i = 0; i<secArr.length; i++){
			document.getElementById('c'+col+'r'+row).appendChild(secArr[i]);
			if(secArr[i].dataset.anim == 'c'){
				document.getElementById('c'+col+'r'+row).appendChild(secArr[i+1]);
				i++;
			}
			row++;
		}
		//format properly
		for(var row = 1; row<=4; row++){
			if(el = document.getElementById('c'+col+'r'+row).firstChild){
				if(el.dataset.anim == 'l'){
					dist = el.dataset.y - row;
					if(dist == 0){
						el.dataset.anim == '';
					}
					else{
						el.style.top = dist*113 +'px';
						move = 1;
					}
				}
				else if(el.dataset.anim == 'c'){
					move = 1;
					el2 = el.nextSibling;
					dist = el2.dataset.y - row;
					el2.style.top = dist*113 + 'px';
				}
			}
		}
	}
}

function findCombos(secArr){
	for(var i = 0; i<secArr.length; i++){
			if(i+1 < secArr.length && secArr[i].dataset.index == secArr[i+1].dataset.index){
				secArr[i].dataset.anim = 'c';
				secArr[i].style.zIndex = '2';
				secArr[i+1].dataset.anim = 'l';
				secArr[i+1].style.zIndex = '1';
				i++;
			}
			else
				secArr[i].dataset.anim = 'l';
		}
}

function createImage(){
	var col = Math.floor(Math.random() * 4 + 1);
	var row = Math.floor(Math.random() * 4 + 1);
	el = document.getElementById('c'+col+'r'+row);
	
	while(el.firstChild != null){
		var col = Math.floor(Math.random() * 4 + 1);
		var row = Math.floor(Math.random() * 4 + 1);
		el = document.getElementById('c'+col+'r'+row);
	}
	
	var img = document.createElement("img");
	img.setAttribute('id', "img"+score);
	score++;

	if(Math.random()<.85){
		img.src = img_src[0];
		img.dataset.index = 0;
	}
	else{
		img.src = img_src[1];
		img.dataset.index = 1;
	}
	//alert("after select index");
	img.dataset.x = col;
	img.dataset.y = row;
	img.dataset.anim = 'n';	
	
	img.style.top = "0px";
	img.style.left = "0px";
	img.style.transform = "scale(0)";

	el.appendChild(img);

	return img;

}

function create2(x, y, index){
	el = document.getElementById('c'+x+'r'+y);
	img = document.createElement('img');
	img.dataset.x = x;
	img.dataset.y = y;
	img.dataset.index = index;
	img.src = img_src[index];
	el.appendChild(img);
	return img;
}

async function moveImages(callback){
	//alert("In move images");
	if(move == 1) createImage();
	//countChildren();
	for(var row = 1; row<=4; row++){
		for(var col = 1; col<=4; col++){
			if(el = document.getElementById('c'+col+'r'+row).firstChild){
				//alert(el + " x: " + el.dataset.x + " y: " + el.dataset.y);
				if(el.dataset.anim=='c'){
					el.dataset.index++;
					el.src = img_src[el.dataset.index];
					el2 = el.nextSibling;
					el2.style.animation = "moveLeft2 1s 1 forwards";
					el.style.transform = "scale(0)";
					el.style.animation = "grow .16s 1 forwards";
				}
				else if(el.dataset.anim == 'n')
					el.style.animation = "grow .16s 1 forwards";
				else if(el.dataset.anim == 'l'){
					el.style.animation = "moveLeft2 .16s 1 forwards";
				}
			}
		}
	}
	//alert("before callback");
	await sleep(160);
	callback();

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function notice(){
	//alert("callback works");
	for(var row = 1; row<=4; row++){
		for(var col = 1; col<=4; col++){
			//alert("notice row: " + row);
			//alert("Notice col: " + col + " cell: " + document.getElementById('c'+col+'r'+row) + " first " + document.getElementById('c'+col+'r'+row).firstChild);
			if(document.getElementById('c'+col+'r'+row).firstChild){
				//alert("in if");
				el = document.getElementById('c'+col+'r'+row).firstChild;
				el.style.top = '0px';
				el.style.left = '0px';
				el.style.transform = "scale(1)";
				el.style.animation = '';
				el.style.zIndex = '1';
				el.dataset.x = col;
				el.dataset.y = row;
				//alert(el.nextSibling);
				if(el.nextSibling)
					//alert("before second if: " + el.nextSibling);
				if(el2 = el.nextSibling){
					//alert("remove");
					el2.parentElement.removeChild(el2);
				}
			}
		}
		//countChildren();
	}

}

function countChildren(){
	//el = document.getElementById(id);
	txt = '';
	col = 1;
	for(var row = 1; row<=4; row++){
		el = document.getElementById('c'+col+'r'+row);
		childArr = el.childNodes;
		for(var i = 0; i<childArr.length; i++)
			txt += "col: " + col + "row: " + row + " i: " + i + " " + childArr[i] + " anim: " + childArr[i].dataset.anim + " index: " + childArr[i].dataset.index + " Id: " + childArr[i].id + '\n';
	}
	alert(txt);
}

function isBoardFull(){
	boardFull=1;
	row = 1;
	//for(row=1; row<=4; row++){
		row = 1;
		for(col=1; col<=4; col++){
			if(document.getElementById('c'+col+'r'+row).firstChild==null){
				boardFull = 0;
				break;
			}
		}
	//}
	return boardFull;
}

function gotMove(){
	for(var col = 1; col<=4; col++){
		for(var row = 1; row<=3; row++){
			currChild = document.getElementById('c'+col+'r'+row).firstChild;
			row1 = row + 1;
			nextChild = document.getElementById('c'+col+'r'+row1).firstChild;
			if(currChild.dataset.index == nextChild.dataset.index){
				return 1;
			}
		}
	}
	
	for(var row = 1; row<=4; row++){
		for(var col = 1; col<=3; col++){
			currChild = document.getElementById('c'+col+'r'+row).firstChild;
			col1 = col + 1;
			nextChild = document.getElementById('c'+col1+'r'+row).firstChild;
			if(currChild.dataset.index == nextChild.dataset.index){
				return 1;
			}
		}
	}
	return 0;
	
}

