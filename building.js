var scv1buildingMode = 0; //scv in build mode?
var scv1building = 0; //scv building?
var scv1buildingSet = 0; //building set?
var scv2buildingMode = 0; //scv in build mode?
var scv2building = 0; //scv building?
var scv2buildingSet = 0; //building set?
var scv3buildingMode = 0; //scv in build mode?
var scv3building = 0; //scv building?
var scv3buildingSet = 0; //building set?
var scv4buildingMode = 0; //scv in build mode?
var scv4building = 0; //scv building?
var scv4buildingSet = 0; //building set?

var buildingCount = 0; //how many buildings

var buildingArray = new Array();

var scvbuildingModeArray = new Array();
scvbuildingModeArray[1] = 'scv1buildingMode';
scvbuildingModeArray[2] = 'scv2buildingMode';
scvbuildingModeArray[3] = 'scv3buildingMode';
scvbuildingModeArray[4] = 'scv4buildingMode';

var scv1buildingx = 0;
var scv1buildingy = 0;
var scv2buildingx = 0;
var scv2buildingy = 0;
var scv3buildingx = 0;
var scv3buildingy = 0;
var scv4buildingx = 0;
var scv4buildingy = 0;

function selectBuilding()
{
	//for each building in array
	for (buildingArrayAmount = buildingArray.length-1;buildingArrayAmount>=0;buildingArrayAmount--)
	{
		//what is selected buildings's element id?
		var buildingElement = 'building'+buildingArrayAmount;
		console.log(buildingElement);
		//check if mouse is over building
console.log(document.getElementById(buildingElement).offsetLeft);
console.log(document.getElementById(buildingElement).offsetTop);
console.log(window.event.clientX+window.pageXOffset);
console.log(window.event.clientY+window.pageYOffset);
		if(window.event.clientX+window.pageXOffset > document.getElementById(buildingElement).offsetLeft && window.event.clientX+window.pageXOffset < document.getElementById(buildingElement).offsetLeft+100 && window.event.clientY+window.pageYOffset > document.getElementById(buildingElement).offsetTop && window.event.clientY+window.pageYOffset < document.getElementById(buildingElement).offsetTop+100)
		{
				document.getElementById('interfaceeffects').src = 'sounds/buildings/academy.mp3';
				var interfaceeffects = document.getElementById('interfaceeffects');
				interfaceeffects.play();

				//hide commands
				movementCommands('hidden');
				buildCommands('hidden');
				
				//set portrait image to advisor
				portrait('advisor.gif');

				//deselect other units
				for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
				{
					var unitElement = 'scv'+unitArrayAmount+'selected';
					eval(unitElement = '0');
				}


		}
	}
}

function build1(scvid)
{
	//if (buildingMode == 1)
	console.log(scvid+'build1');
	playInterfaceEffect('buildings/tbldgplc.mp3');

	mapCursor('cursor/arrow.gif');

	eval(scvid + 'buildingMode = 0');
	eval(scvid + 'buildingSet = 1');
		
	//set global mouse position vars
	eval(scvid + 'buildingx =' + window.event.clientX + '+' + window.pageXOffset);
	eval(scvid + 'buildingy =' + window.event.clientY + '+' + window.pageYOffset);
		
	//check which scvs are selected
	for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
	{
		var unitElement = 'scv'+unitArrayAmount+'selected';
		var selectedStatus = eval(unitElement);

		if(selectedStatus=='1')
		{
			scvMove('scv'+unitArrayAmount);
		}	
	}
}

function build2(scvid)
{
	if (eval(scvid + 'buildingSet == 1') == true)
	{
		//set scv to building mode so it will not move
		eval(scvid + 'building' + '=' + '1');
		var newBuilding;
		var newBuildingId;
		
		//create div for building
		newBuilding = document.createElement('div'); 
		//set building div ID by instance
		newBuildingId = 'building' + buildingCount;
		newBuilding.setAttribute('id', newBuildingId);
		//set building dimensions
		newBuilding.style.width = 95;
		newBuilding.style.height = 95;
		//set building background. Dimensions must be set or bg will repeat.
		newBuilding.style.background = "url('images/academy/academybdg.png')"; //in building image
		document.getElementById('map').appendChild(newBuilding);
		
		//move to origin
		new Effect.Move(newBuildingId, { x: 0, y: -document.getElementById(newBuildingId).offsetTop, mode: 'relative', duration:0 });
		
		//get buildingx/y vars from scv specific var
		var varx = scvid + 'buildingx';
		var vary = scvid + 'buildingy';
		var buildingx = eval(varx);
		var buildingy = eval(vary);
		
		//now move relative to its origin position
		new Effect.Move(newBuildingId, { x: buildingx-50, y: buildingy-50, mode: 'relative', duration:0 });
console.log(buildingx);
console.log(buildingy);
		//set cursor
		document.getElementById(newBuildingId).style.cursor = 'url(images/cursor/magnifier.gif)';
		
		//add building to array
		buildingArray[buildingCount]=newBuilding;
		
		//not building mode
	eval(scvid + 'buildingMode = 0');
		
		//is building done
	eval(scvid + 'buildingSet = 0');

		//future building numbers
		buildingCount++;
		
		var randomNumber = Math.floor(Math.random() * 4);
		playInterfaceEffect('scv/repair' + randomNumber + '.mp3');
console.log(eval(scvid+'.id'));
		//delay until finished building
		setTimeout("build3(" + "'" + eval(scvid + '.id') + "','" + newBuildingId + "')",1000); //pass on scvid and newBuildingId div var
	}
}

function build3(scvid,newBuildingId)
{
console.log(scvid + ' scvid');
console.log(newBuildingId + ' newBuildingId');
	//scv building done voiceover
	document.getElementById('unitvoice').src = 'sounds/scv/TSCUpd00.mp3';
	var scvvoice = document.getElementById('unitvoice');
	scvvoice.play();
	
	//get passed newBuildingID <- building's ID!
	var newBuilding = document.getElementById(newBuildingId); //assign to a var
	//set element id's style
	newBuilding.style.background = "url('images/academy/academy.png')"; //finished building image

	//move scv out of building for selection
	document.getElementById(scvid).style.background = "url('images/scv/135.png')";
	new Effect.Move(scvid, { x:50, y: 50, mode: 'relative', duration:1 });	

	//set back so scv can move again
	eval(scvid + 'building' + '=' + '0');

}

document.getElementById('map').oncontextmenu = function() 
{
for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
{
	var unitElement = 'scv'+unitArrayAmount+'selected';
	var selectedStatus = eval(unitElement);

	if(selectedStatus=='1')
	{
		scvMove('scv'+unitArrayAmount);
	}	

}

	//scvMove(scvid);
//cancel building set
if(scv1selected==1)
{
	buildingSet = 0;
	document.getElementById('map').style.cursor = 'url(images/cursor/arrow.gif)';
}

}	