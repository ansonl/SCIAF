var buildingMode = 0; //scv in build mode?
var buildingSet = 0; //building set?
var buildingCount = 0; //how many buildings

var buildingArray = new Array();

var globalmousex = 0;
var globalmousey = 0;

var newBuilding;
var newBuildingId;

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

function build1()
{
	//if (buildingMode == 1)
	
	playInterfaceEffect('buildings/tbldgplc.mp3');

	mapCursor('cursor/arrow.gif');

	buildingMode = 0;
	buildingSet = 1;
		
	//set global mouse position vars
	globalmousex = window.event.clientX+window.pageXOffset;
	globalmousey = window.event.clientY+window.pageYOffset;
		
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

	if (buildingSet == 1)
	{
		//set scv to building mode so it will not move
		eval(scvid + 'building' + '=' + '1');

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
		//now move relative to its origin position
		new Effect.Move(newBuildingId, { x: globalmousex-50, y: globalmousey-50, mode: 'relative', duration:0 });

		//set cursor
		document.getElementById(newBuildingId).style.cursor = 'url(images/cursor/magnifier.gif)';
		
		//add building to array
		buildingArray[buildingCount]=newBuilding;
		
		//not building mode
		buildingMode = 0;
		
		//is building done
		buildingSet = 0;

		//future building numbers
		buildingCount++;
		
		var randomNumber = Math.floor(Math.random() * 4);
		playInterfaceEffect('scv/repair' + randomNumber + '.mp3');

		//delay until finished building
		setTimeout("build3('" + scvid + "')",1000);
	}
}

function build3(scvid)
{
console.log(scvid);
	//scv building done voiceover
	document.getElementById('unitvoice').src = 'sounds/scv/TSCUpd00.mp3';
	var scvvoice = document.getElementById('unitvoice');
	scvvoice.play();
	
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