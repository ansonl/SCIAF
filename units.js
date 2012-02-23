var unitselected;
var scv1move = Effect.Fade('scv1', { duration: 1.0, from: 0, to: 1 });
var scv2move = Effect.Fade('scv2', { duration: 1.0, from: 0, to: 1 });
var scv3move = Effect.Fade('scv3', { duration: 1.0, from: 0, to: 1 });
var scv4move = Effect.Fade('scv4', { duration: 1.0, from: 0, to: 1 });
var i = 0;

var scv1selected = 0;
var scv2selected = 0;
var scv3selected = 0;
var scv4selected = 0;

var scv1building = 0;
var scv2building = 0;
var scv3building = 0;
var scv4building = 0;

var unitArray = new Array();
unitArray[1] = 'scv1';
unitArray[2] = 'scv2';
unitArray[3] = 'scv3';
unitArray[4] = 'scv4';

function playSCVReady()
{
	//SCV Ready sound
	document.getElementById('unitvoice').src = 'sounds/scv/TSCRdy00.mp3';
	var scvready = document.getElementById('unitvoice');
	scvready.play();
}

function playMapSoundTrack()
{
	//random terran soundtrack
	var randomSoundtrack = Math.floor(Math.random()*3);
	console.log("Random soundtrack: "+randomSoundtrack);
	document.getElementById('soundtrack').src = 'sounds/scv/terran'+randomSoundtrack+'.mp3';
	var soundtrack = document.getElementById('soundtrack');
	soundtrack.play();
}

document.getElementById('map').onclick = function() {
	//selectUnit();
	if(selectUnit()!=true)
	{
		selectBuilding();
	}
		for (scvbuildingModeArrayAmount=scvbuildingModeArray.length-1;scvbuildingModeArrayAmount>=1;scvbuildingModeArrayAmount--)
		{
			var scvBuildingMode = 'scv'+scvbuildingModeArrayAmount+'buildingMode';
			var buildingModeStatus = eval(scvBuildingMode);
			if(buildingModeStatus=='1')
			{
				build1('scv'+scvbuildingModeArrayAmount);
				scvbuildingModeArrayAmount = 1; //stop scanning as we already have one scv to build with
			}
		}
/*
	if(buildingMode == 1)
	{
			//check which scvs are selected
	for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
	{
		var unitElement = 'scv'+unitArrayAmount+'selected';
		var selectedStatus = eval(unitElement);

		if(selectedStatus=='1')
		{
			build1('scv'+unitArrayAmount);
			unitArrayAmount = 1; //stop scanning as we already have one scv to build with
		}	
	}
	}
*/
}

function selectUnit()
{
	//for all items in unitArray except item 0
	for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
	{
		//what is selected unit's element id?
		var unitElement = 'scv'+unitArrayAmount;
	
		if(window.event.clientX+window.pageXOffset > document.getElementById(unitElement).offsetLeft && window.event.clientX+window.pageXOffset < document.getElementById(unitElement).offsetLeft+100 && window.event.clientY+window.pageYOffset > document.getElementById(unitElement).offsetTop && window.event.clientY+window.pageYOffset < document.getElementById(unitElement).offsetTop+100)
		{
			eval(unitElement + 'selected' + '=' + '1');
			console.log('Selected=' + unitElement);

			//set portrait
			portrait('scv.png');				

			//show commands
			movementCommands('visible');
			buildCommands('visible');	

				

			//deselect other scvs
			for (unitArrayAmount2=unitArray.length-1;unitArrayAmount2>=1;unitArrayAmount2--)
			{
				var unitElement2 = 'scv'+unitArrayAmount2;
				if(unitElement2 != unitElement)
				{
					eval(unitElement2 + 'selected' + '=' + '0');
					console.log('Deselected=' + unitElement2);
				}
			}
			return true;
		}
	}
}

function scvMove(scvid)
{
console.log('scvid'+ eval(scvid + 'building' + '==' + '0'));
if(eval(scvid + 'building' + '==' + '0') == true)
{

//so box selection does not happen
mouseDown = 0;

//vars for scv displacement calculation
var scvx = 0;
var scvy = 0;
var mousex = 0;
var mousey = 0;
var movex = 0;
var movey = 0;
console.log(scvid);

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
document.getElementById('unitvoice').src = 'sounds/scv/TSCYes0'+randomNumber+'.mp3';
var unitvoice = document.getElementById('unitvoice');
if(i>0)
{
unitvoice.pause();
}
unitvoice.play();

//cancel that unit's scope queue
Effect.Queues.get(scvid + 'scope').invoke('cancel');

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

//which move effect do we want?
var scvMoveEffect = scvid + 'move';
console.log(scvMoveEffect);
//move effect
eval(scvMoveEffect + "= new Effect.Move(" + scvid + ", { x: " + movex + ", y:" + movey + ", mode: 'relative',duration:" + moveSpeed + ", transition: Effect.Transitions.linear,fps: 50,afterFinish: function () {build2('" + scvid + "');},queue: { position: 'end', scope: '" + scvid + "scope" + "', limit:1} });");
}
}

document.onkeyup = function(e) {
	if(e.keyCode == 83)//key S
	{
		stopMovement();
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
		build1image();
	}
}