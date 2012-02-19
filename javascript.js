var unitselected;
var scv1move = Effect.Fade('scv1image', { duration: 1.0, from: 0, to: 1 });
var scv2move = Effect.Fade('scv2image', { duration: 1.0, from: 0, to: 1 });
var scv3move = Effect.Fade('scv3image', { duration: 1.0, from: 0, to: 1 });
var scv4move = Effect.Fade('scv4image', { duration: 1.0, from: 0, to: 1 });
var i = 0;

var scv1selected = 0;
var scv2selected = 0;
var scv3selected = 0;
var scv4selected = 0;
var scvid = '';

var unitArray = new Array();
unitArray[1] = 'scv1image';
unitArray[2] = 'scv2image';
unitArray[3] = 'scv3image';
unitArray[4] = 'scv4image';

var buildingMode = 0; //scv in build mode?
var buildingSet = 0; //building set?
var buildingCount = 0; //how many buildings

var globalmousex = 0;
var globalmousey = 0;

function playSCVReady()
{
	//SCV Ready sound
	document.getElementById('scvready').src = 'sounds/scv/TSCRdy00.mp3';
	var scvready = document.getElementById('scvready');
	//scvready.play();
}

function playMapSoundTrack()
{
	//random terran soundtrack
	var randomSoundtrack = Math.floor(Math.random()*3);
	console.log("Random soundtrack: "+randomSoundtrack);
	document.getElementById('soundtrack').src = 'sounds/scv/terran'+randomSoundtrack+'.mp3';
	var soundtrack = document.getElementById('soundtrack');
	//soundtrack.play();
}

document.getElementById('scv1image').onclick = function() {
	scv1selected = 1;
	scv2selected = 0;
	scv3selected = 0;
	scv4selected = 0;
	
	document.getElementById('portraitimage').src = 'images/portraits/scv.png';
	
	//random scv what sound
	var randomSoundtrack = Math.floor(Math.random()*2);
	console.log("Random scv WHAT voice: "+randomSoundtrack);
	document.getElementById('scvvoice').src = 'sounds/scv/TSCWht0'+randomSoundtrack+'.mp3';
	var whatvoice = document.getElementById('scvvoice');
	whatvoice.play();
}

document.getElementById('scv2image').onclick = function() {
	scv1selected = 0;
	scv2selected = 1;
	scv3selected = 0;
	scv4selected = 0;
	
	document.getElementById('portraitimage').src = 'images/portraits/scv.png';
	
	//random scv what sound
	var randomSoundtrack = Math.floor(Math.random()*2);
	console.log("Random scv WHAT voice: "+randomSoundtrack);
	document.getElementById('scvvoice').src = 'sounds/scv/TSCWht0'+randomSoundtrack+'.mp3';
	var whatvoice = document.getElementById('scvvoice');
	whatvoice.play();
}

document.getElementById('scv3image').onclick = function() {
	scv1selected = 0;
	scv2selected = 0;
	scv3selected = 1;
	scv4selected = 0;
	
	document.getElementById('portraitimage').src = 'images/portraits/scv.png';
	
	//random scv what sound
	var randomWhat = Math.floor(Math.random()*3);
	console.log("Random scv WHAT voice: "+randomWhat);
	document.getElementById('scvvoice').src = 'sounds/scv/TSCWht0'+randomWhat+'.mp3';
	var whatvoice = document.getElementById('scvvoice');
	whatvoice.play();
}

document.getElementById('scv4image').onclick = function() {
	scv1selected = 0;
	scv2selected = 0;
	scv3selected = 0;
	scv4selected = 1;
	
	document.getElementById('portraitimage').src = 'images/portraits/scv.png';
	
	//random scv what sound
	var randomSoundtrack = Math.floor(Math.random()*2);
	console.log("Random scv WHAT voice: "+randomSoundtrack);
	document.getElementById('scvvoice').src = 'sounds/scv/TSCWht0'+randomSoundtrack+'.mp3';
	var whatvoice = document.getElementById('scvvoice');
	whatvoice.play();
}

document.getElementById('map').onclick = function() {
	build1();
}

function build1()
{

	if (buildingMode == 1)
	{
		document.getElementById('interfaceeffects').src = 'sounds/buildings/tbldgplc.mp3';
		var interfaceeffects = document.getElementById('interfaceeffects');
		interfaceeffects.play();
		document.getElementById('map').style.cursor = 'url(images/cursor/arrow.gif)';

buildingMode = 0;
		buildingSet = 1;
console.log('buildinMode is 0');
console.log('buildingSet is 1');

globalmousex = window.event.clientX+window.pageXOffset;
console.log(globalmousex);
globalmousey = window.event.clientY+window.pageYOffset;
console.log(globalmousey);
		scvMove(); 		
	}

}

function build2()
{
	if (buildingSet == 1)
	{
		var newBuilding = document.createElement('div'); 
		var newBuildingId = 'building' + buildingCount;
		newBuilding.setAttribute('id', newBuildingId);
		newBuilding.style.width = 95;
		newBuilding.style.height = 95;
		//newBuilding.style.left = globalmousex;
		//newBuilding.style.top = globalmousey;		
		newBuilding.style.background = "url('images/academy/academy.png')";
		document.getElementById('map').appendChild(newBuilding);
		buildingMode = 0;
		buildingSet = 0;
		buildingCount++;
		//move to origin
		new Effect.Move(newBuildingId, { x: 0, y: -document.getElementById(newBuildingId).offsetTop, mode: 'relative', duration:0 });
		//now move relative to its origin position
		new Effect.Move(newBuildingId, { x: globalmousex-50, y: globalmousey-50, mode: 'relative', duration:0 });

		document.getElementById('scvvoice').src = 'sounds/scv/TSCUpd00.mp3';
		var scvvoice = document.getElementById('scvvoice');
		scvvoice.play();
	}
}

document.getElementById('map').oncontextmenu = function() {
	scvMove();
	
	//cancel building set
if(scv1selected==1)
{
	buildingSet = 0;
	document.getElementById('map').style.cursor = 'url(images/cursor/arrow.gif)';
}
}
function scvMove()
{
//so box selection does not happen
mouseDown = 0;

//if no units selected
if (scv1selected == 0 && scv2selected == 0 && scv3selected == 0 && scv4selected == 0)
{

}
else
{
//vars for scv displacement calculation
var scvx = 0;
var scvy = 0;
var mousex = 0;
var mousey = 0;
var movex = 0;
var movey = 0;
var scvid = '';

//mouse position w/ scroll added
mousex = window.event.clientX+window.pageXOffset;
mousey = window.event.clientY+window.pageYOffset;
console.log('mouseX= '+mousex+' '+'mouseY= '+mousey);
//target cursor
//-20 and +10 to put target under arrow cursor
new Effect.Move('targetcursor', { x: mousex-20, y: mousey+10, mode: 'absolute',duration:0, transition: Effect.Transitions.linear,fps: 50,queue: { position: 'end', scope: 'cursor', limit:1} });
Effect.Pulsate('targetcursor', { pulses: .5, duration: .7,queue: { position: 'end', scope: 'cursorpulse', limit:1} });

//random scv yes voice
var randomNumber = Math.floor(Math.random() * 4);
console.log("Random scv YES voice: "+randomNumber);
document.getElementById('scvvoice').src = 'sounds/scv/TSCYes0'+randomNumber+'.mp3';
var scvvoice = document.getElementById('scvvoice');
if(i>0)
{
scvvoice.pause();
}
scvvoice.play();



if(scv1selected==1)//IF scv 1 selected
{
//set scv ID var
scvid = 'scv1image';
//cancel previous scv movement
scv1move.cancel();
console.log("stop");

//get current scv position
var oElement = document.getElementById(scvid)
scvx = 0;
scvy = 0;
scvx = oElement.offsetLeft;
scvy = oElement.offsetTop;
//+36 to make scv image center move to mouse postion instead of image's upper left (origin)
scvx=scvx+36;
scvy=scvy+36;
console.log('scvX= '+scvx+' '+'scvY= '+scvy);

//get displacement x and displacement y
movex = mousex - scvx;
movey = mousey - scvy;
console.log('moveX= '+movex+' '+'moveY= '+movey);

//get diagonal displacement (hypotenuse)
var displacement = Math.sqrt((movex*movex)+(movey*movey));
console.log('Displacement= '+displacement);

//set pixels per second
var moveSpeed =displacement/100;
console.log('Move speed= '+moveSpeed);

//calculate angle of movement
var moveAngle = (180/Math.PI)*(Math.atan2(movey,movex))
console.log('Move angle= '+moveAngle);

//movement number
i=i+1;
console.log('Move number= '+i);

//set correct image for angle
if (moveAngle < -165 && moveAngle > -180)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}
if (moveAngle < -142 && moveAngle > -165)
{
	document.getElementById(scvid).style.background = "url('images/scv/300.png')";
}
if (moveAngle < -127 && moveAngle > -142)
{
	document.getElementById(scvid).style.background = "url('images/scv/315.png')";
}
if (moveAngle < -105 && moveAngle > -127)
{
	document.getElementById(scvid).style.background = "url('images/scv/330.png')";
}
if (moveAngle < -75 && moveAngle > -105)
{
	document.getElementById(scvid).style.background = "url('images/scv/0.png')";
}
if (moveAngle < -53 && moveAngle > -75)
{
	document.getElementById(scvid).style.background = "url('images/scv/30.png')";
}
if (moveAngle < -38 && moveAngle > -53)
{
	document.getElementById(scvid).style.background = "url('images/scv/45.png')";
}
if (moveAngle < -15 && moveAngle > -38)
{
	document.getElementById(scvid).style.background = "url('images/scv/60.png')";
}
if (moveAngle < 15 && moveAngle > -15)
{
	document.getElementById(scvid).style.background = "url('images/scv/90.png')";
}
if (moveAngle < 38 && moveAngle > 15)
{
	document.getElementById(scvid).style.background = "url('images/scv/120.png')";
}
if (moveAngle < 53 && moveAngle > 38)
{
	document.getElementById(scvid).style.background = "url('images/scv/135.png')";
}
if (moveAngle < 75 && moveAngle > 53)
{
	document.getElementById(scvid).style.background = "url('images/scv/150.png')";
}
if (moveAngle < 105 && moveAngle > 75)
{
	document.getElementById(scvid).style.background = "url('images/scv/180.png')";
}
if (moveAngle < 127 && moveAngle > 105)
{
	document.getElementById(scvid).style.background = "url('images/scv/210.png')";
}
if (moveAngle < 142 && moveAngle > 127)
{
	document.getElementById(scvid).style.background = "url('images/scv/225.png')";
}
if (moveAngle < 165 && moveAngle > 142)
{
	document.getElementById(scvid).style.background = "url('images/scv/240.png')";
}
if (moveAngle < 180 && moveAngle > 165)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}

//move effect
scv1move = new Effect.Move(scvid, { x: movex, y: movey, mode: 'relative',duration:moveSpeed, transition: Effect.Transitions.linear,fps: 50,afterFinish: function () {build2();},queue: { position: 'end', scope: 'scv1scope', limit:1}});

}

if(scv2selected==1)//IF scv 2 selected
{
//set scv ID var
scvid = 'scv2image';
//cancel previous scv movement
scv2move.cancel();
console.log("stop");

//get current scv position
var oElement = document.getElementById(scvid)
scvx = 0;
scvy = 0;
scvy += oElement.offsetTop;
scvx += oElement.offsetLeft;
//+36 to make scv image center move to mouse postion instead of image's upper left (origin)
scvx=scvx+36;
scvy=scvy+36;
console.log('scvX= '+scvx+' '+'scvY= '+scvy);

//get displacement x and displacement y
movex = mousex - scvx;
movey = mousey - scvy;
console.log('moveX= '+movex+' '+'moveY= '+movey);

//get diagonal displacement (hypotenuse)
var displacement = Math.sqrt((movex*movex)+(movey*movey));
console.log('Displacement= '+displacement);

//set pixels per second
var moveSpeed =displacement/100;
console.log('Move speed= '+moveSpeed);

//calculate angle of movement
var moveAngle = (180/Math.PI)*(Math.atan2(movey,movex))
console.log('Move angle= '+moveAngle);

//movement number
i=i+1;
console.log('Move number= '+i);

//set correct image for angle
if (moveAngle < -165 && moveAngle > -180)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}
if (moveAngle < -142 && moveAngle > -165)
{
	document.getElementById(scvid).style.background = "url('images/scv/300.png')";
}
if (moveAngle < -127 && moveAngle > -142)
{
	document.getElementById(scvid).style.background = "url('images/scv/315.png')";
}
if (moveAngle < -105 && moveAngle > -127)
{
	document.getElementById(scvid).style.background = "url('images/scv/330.png')";
}
if (moveAngle < -75 && moveAngle > -105)
{
	document.getElementById(scvid).style.background = "url('images/scv/0.png')";
}
if (moveAngle < -53 && moveAngle > -75)
{
	document.getElementById(scvid).style.background = "url('images/scv/30.png')";
}
if (moveAngle < -38 && moveAngle > -53)
{
	document.getElementById(scvid).style.background = "url('images/scv/45.png')";
}
if (moveAngle < -15 && moveAngle > -38)
{
	document.getElementById(scvid).style.background = "url('images/scv/60.png')";
}
if (moveAngle < 15 && moveAngle > -15)
{
	document.getElementById(scvid).style.background = "url('images/scv/90.png')";
}
if (moveAngle < 38 && moveAngle > 15)
{
	document.getElementById(scvid).style.background = "url('images/scv/120.png')";
}
if (moveAngle < 53 && moveAngle > 38)
{
	document.getElementById(scvid).style.background = "url('images/scv/135.png')";
}
if (moveAngle < 75 && moveAngle > 53)
{
	document.getElementById(scvid).style.background = "url('images/scv/150.png')";
}
if (moveAngle < 105 && moveAngle > 75)
{
	document.getElementById(scvid).style.background = "url('images/scv/180.png')";
}
if (moveAngle < 127 && moveAngle > 105)
{
	document.getElementById(scvid).style.background = "url('images/scv/210.png')";
}
if (moveAngle < 142 && moveAngle > 127)
{
	document.getElementById(scvid).style.background = "url('images/scv/225.png')";
}
if (moveAngle < 165 && moveAngle > 142)
{
	document.getElementById(scvid).style.background = "url('images/scv/240.png')";
}
if (moveAngle < 180 && moveAngle > 165)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}

//move effect
scv2move = new Effect.Move(scvid, { x: movex, y: movey, mode: 'relative',duration:moveSpeed, transition: Effect.Transitions.linear,fps: 50,queue: { position: 'end', scope: 'scv2scope', limit:1} });
}

if(scv3selected==1)//IF scv 3 selected
{
//set scv ID var
scvid = 'scv3image';
//cancel previous scv movement
scv3move.cancel();
console.log("stop");

//get current scv position
var oElement = document.getElementById(scvid)
scvx = 0;
scvy = 0;
scvy += oElement.offsetTop;
scvx += oElement.offsetLeft;
//+36 to make scv image center move to mouse postion instead of image's upper left (origin)
scvx=scvx+36;
scvy=scvy+36;
console.log('scvX= '+scvx+' '+'scvY= '+scvy);

//get displacement x and displacement y
movex = mousex - scvx;
movey = mousey - scvy;
console.log('moveX= '+movex+' '+'moveY= '+movey);

//get diagonal displacement (hypotenuse)
var displacement = Math.sqrt((movex*movex)+(movey*movey));
console.log('Displacement= '+displacement);

//set pixels per second
var moveSpeed =displacement/100;
console.log('Move speed= '+moveSpeed);

//calculate angle of movement
var moveAngle = (180/Math.PI)*(Math.atan2(movey,movex))
console.log('Move angle= '+moveAngle);

//movement number
i=i+1;
console.log('Move number= '+i);

//set correct image for angle
if (moveAngle < -165 && moveAngle > -180)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}
if (moveAngle < -142 && moveAngle > -165)
{
	document.getElementById(scvid).style.background = "url('images/scv/300.png')";
}
if (moveAngle < -127 && moveAngle > -142)
{
	document.getElementById(scvid).style.background = "url('images/scv/315.png')";
}
if (moveAngle < -105 && moveAngle > -127)
{
	document.getElementById(scvid).style.background = "url('images/scv/330.png')";
}
if (moveAngle < -75 && moveAngle > -105)
{
	document.getElementById(scvid).style.background = "url('images/scv/0.png')";
}
if (moveAngle < -53 && moveAngle > -75)
{
	document.getElementById(scvid).style.background = "url('images/scv/30.png')";
}
if (moveAngle < -38 && moveAngle > -53)
{
	document.getElementById(scvid).style.background = "url('images/scv/45.png')";
}
if (moveAngle < -15 && moveAngle > -38)
{
	document.getElementById(scvid).style.background = "url('images/scv/60.png')";
}
if (moveAngle < 15 && moveAngle > -15)
{
	document.getElementById(scvid).style.background = "url('images/scv/90.png')";
}
if (moveAngle < 38 && moveAngle > 15)
{
	document.getElementById(scvid).style.background = "url('images/scv/120.png')";
}
if (moveAngle < 53 && moveAngle > 38)
{
	document.getElementById(scvid).style.background = "url('images/scv/135.png')";
}
if (moveAngle < 75 && moveAngle > 53)
{
	document.getElementById(scvid).style.background = "url('images/scv/150.png')";
}
if (moveAngle < 105 && moveAngle > 75)
{
	document.getElementById(scvid).style.background = "url('images/scv/180.png')";
}
if (moveAngle < 127 && moveAngle > 105)
{
	document.getElementById(scvid).style.background = "url('images/scv/210.png')";
}
if (moveAngle < 142 && moveAngle > 127)
{
	document.getElementById(scvid).style.background = "url('images/scv/225.png')";
}
if (moveAngle < 165 && moveAngle > 142)
{
	document.getElementById(scvid).style.background = "url('images/scv/240.png')";
}
if (moveAngle < 180 && moveAngle > 165)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}

//move effect
scv3move = new Effect.Move(scvid, { x: movex, y: movey, mode: 'relative',duration:moveSpeed, transition: Effect.Transitions.linear,fps: 50,queue: { position: 'end', scope: 'scv3scope', limit:1} });
}

if(scv4selected==1)//IF scv 4 selected
{
//set scv ID var
scvid = 'scv4image';
//cancel previous scv movement
scv4move.cancel();
console.log("stop");

//get current scv position
var oElement = document.getElementById(scvid)
scvx = 0;
scvy = 0;
scvy += oElement.offsetTop;
scvx += oElement.offsetLeft;
//+36 to make scv image center move to mouse postion instead of image's upper left (origin)
scvx=scvx+36;
scvy=scvy+36;
console.log('scvX= '+scvx+' '+'scvY= '+scvy);

//get displacement x and displacement y
movex = mousex - scvx;
movey = mousey - scvy;
console.log('moveX= '+movex+' '+'moveY= '+movey);

//get diagonal displacement (hypotenuse)
var displacement = Math.sqrt((movex*movex)+(movey*movey));
console.log('Displacement= '+displacement);

//set pixels per second
var moveSpeed =displacement/100;
console.log('Move speed= '+moveSpeed);

//calculate angle of movement
var moveAngle = (180/Math.PI)*(Math.atan2(movey,movex))
console.log('Move angle= '+moveAngle);

//movement number
i=i+1;
console.log('Move number= '+i);

//set correct image for angle
if (moveAngle < -165 && moveAngle > -180)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}
if (moveAngle < -142 && moveAngle > -165)
{
	document.getElementById(scvid).style.background = "url('images/scv/300.png')";
}
if (moveAngle < -127 && moveAngle > -142)
{
	document.getElementById(scvid).style.background = "url('images/scv/315.png')";
}
if (moveAngle < -105 && moveAngle > -127)
{
	document.getElementById(scvid).style.background = "url('images/scv/330.png')";
}
if (moveAngle < -75 && moveAngle > -105)
{
	document.getElementById(scvid).style.background = "url('images/scv/0.png')";
}
if (moveAngle < -53 && moveAngle > -75)
{
	document.getElementById(scvid).style.background = "url('images/scv/30.png')";
}
if (moveAngle < -38 && moveAngle > -53)
{
	document.getElementById(scvid).style.background = "url('images/scv/45.png')";
}
if (moveAngle < -15 && moveAngle > -38)
{
	document.getElementById(scvid).style.background = "url('images/scv/60.png')";
}
if (moveAngle < 15 && moveAngle > -15)
{
	document.getElementById(scvid).style.background = "url('images/scv/90.png')";
}
if (moveAngle < 38 && moveAngle > 15)
{
	document.getElementById(scvid).style.background = "url('images/scv/120.png')";
}
if (moveAngle < 53 && moveAngle > 38)
{
	document.getElementById(scvid).style.background = "url('images/scv/135.png')";
}
if (moveAngle < 75 && moveAngle > 53)
{
	document.getElementById(scvid).style.background = "url('images/scv/150.png')";
}
if (moveAngle < 105 && moveAngle > 75)
{
	document.getElementById(scvid).style.background = "url('images/scv/180.png')";
}
if (moveAngle < 127 && moveAngle > 105)
{
	document.getElementById(scvid).style.background = "url('images/scv/210.png')";
}
if (moveAngle < 142 && moveAngle > 127)
{
	document.getElementById(scvid).style.background = "url('images/scv/225.png')";
}
if (moveAngle < 165 && moveAngle > 142)
{
	document.getElementById(scvid).style.background = "url('images/scv/240.png')";
}
if (moveAngle < 180 && moveAngle > 165)
{
	document.getElementById(scvid).style.background = "url('images/scv/270.png')";
}

//move effect
scv4move = new Effect.Move(scvid, { x: movex, y: movey, mode: 'relative',duration:moveSpeed, transition: Effect.Transitions.linear,fps: 50,queue: { position: 'end', scope: 'scv4scope', limit:1} });
}

}
}

document.onkeyup = function(e) {
	if(e.keyCode == 83)//key S
	{
		
//play button sound and cancel scv movement
		document.getElementById('interfaceeffects').src = 'sounds/button.mp3';
		var interfaceeffects = document.getElementById('interfaceeffects');
		interfaceeffects.play();
	
		if(scv1selected==1)
		{
			scv1move.cancel();
		}
		if(scv2selected==1)
		{
			scv2move.cancel();
		}
		if(scv3selected==1)
		{
			scv3move.cancel();
		}
		if(scv4selected==1)
		{
			scv4move.cancel();
		}

	}
	if(e.keyCode == 37)//key left arrow
	{
		window.scrollBy(-100,0);
	}
	if(e.keyCode == 38)//key up arrow
	{
		window.scrollBy(0,-100);
	}
	if(e.keyCode == 39)//key right arrow
	{
		window.scrollBy(100,0);
	}
	if(e.keyCode == 40)//key down arrow
	{
		window.scrollBy(0,100);
	}
	if(e.keyCode == 66)//B
	{
		//if(scv1selected==1||scv2selected==1||scv3selected==1||scv4selected==1)	
		if(scv1selected==1)	
		{	
			buildingMode = 1;
			console.log('buildingmode is 1');	
			url1 = 'url(images/academy/academyplc.png)';
			document.getElementById('map').style.cursor = url1;
			
			document.getElementById('interfaceeffects').src = 'sounds/button.mp3';
			var interfaceeffects = document.getElementById('interfaceeffects');
			interfaceeffects.play();
		}
		else
		{
			document.getElementById('interfaceeffects').src = 'sounds/buzz.mp3';
			var interfaceeffects = document.getElementById('interfaceeffects');
			interfaceeffects.play();
		}
	}
}

function stopeffects()
{

//play button sound and cancel scv movement
	document.getElementById('interfaceeffects').src = 'sounds/button.mp3';
	var interfaceeffects = document.getElementById('interfaceeffects');
	interfaceeffects.play();

	if(scv1selected==1)
	{
		scv1move.cancel();
	}
	if(scv2selected==1)
	{
		scv2move.cancel();
	}
	if(scv3selected==1)
	{
		scv3move.cancel();
	}
	if(scv4selected==1)
	{
		scv4move.cancel();
	}

}