var music = 0; // 0 = no background music 1 = yes background music

function setupMenu()
{	
	//load random background for menu
	var randomBackground = Math.floor(Math.random()*2);
	console.log("Random background: "+randomBackground);
	var extension = ".jpg";
	document.getElementById('menubackground').src = 'images/menu/' + randomBackground + extension;

	//Fade in menu
	Effect.Fade('menu', { duration: 0.5, from: 0, to: 1 });
	
	//hide map div
	document.getElementById('map').style.width = "0%";
	document.getElementById('map').style.height = "0%";
	document.getElementById('map').style.visibility = "hidden";
	
	//hide console
	document.getElementById('console').style.width = "0%";
	document.getElementById('console').style.height = "0%";
	document.getElementById('console').style.visibility = "hidden";

	//play main menu soundtrack
	document.getElementById('soundtrack').src = 'sounds/mainmenu.mp3';
	var soundtrack = document.getElementById('soundtrack');
	if (music == 1)
	{
		soundtrack.play();	
	}	
	
	//play swish in sound
	//playInterfaceEffect('swishin.mp3');

	//load random background for map
	var randomBackground = Math.floor(Math.random()*4);
	console.log("Random background: "+randomBackground);
	var part1 = "url('images/background/";
	var part2 = ".png')";
	document.getElementById('map').style.background = part1 + randomBackground + part2;

}

document.getElementById('playinner').onmouseover = function() 
{
	document.getElementById('interfaceeffects').src = 'sounds/mouseover.mp3';
	var interfaceeffects = document.getElementById('interfaceeffects');
	interfaceeffects.play();
}

document.getElementById('playinner').onclick = function() 
{
	//play mouse down sound
	playInterfaceEffect2('mousedown.mp3');

	//play swish out sound
	playInterfaceEffect('swishout.mp3');

	//Stop main menu soundtrack
	var soundtrack = document.getElementById('soundtrack');
	soundtrack.pause();	
	
	//hide menu
	Effect.Puff('menu', { duration: 1 });
	//document.getElementById('menu').style.visibility = "hidden";

	//show map
	
	document.getElementById('map').style.width = "1750px";
	document.getElementById('map').style.height = "1500px";
	document.getElementById('map').style.visibility = "visible";
	Effect.Fade('map', { duration: 0.5, from: 0, to: 1 });
	

	
	document.getElementById('console').style.width = "100%";
	document.getElementById('console').style.height = "187px";
	document.getElementById('console').style.visibility = "visible";
	Effect.Fade('console', { duration: 1, from: 0, to: 1 });

	mouseDown = 0; //stop box selection

	//seperate delay for SCV Ready and Map soundtracks
	if (music == 1)
	{	
	setTimeout('playSCVReady()',1000);
	setTimeout('playMapSoundTrack()',3000);
	}
}

document.getElementById('featuresinner').onmouseover = function() 
{
	document.getElementById('interfaceeffects').src = 'sounds/mouseover.mp3';
	var interfaceeffects = document.getElementById('interfaceeffects');
	interfaceeffects.play();
}

document.getElementById('featuresinner').onclick = function() 
{
	document.getElementById('interfaceeffects').src = 'sounds/mousedown.mp3';
	var interfaceeffects = document.getElementById('interfaceeffects');
	interfaceeffects.play();	

	setTimeout('showFeatureAlert()',500);
	}

function showFeatureAlert()
{
	alert('StarCraft in a Folder (SCIAF) Features:\n\nDIRECT UNIT CONTROL:\nLeft click to select unit; right click to issue Move command.\nPress S key or Stop button to issue Stop command.\nPress B key to build an Academy. Only the uppermost scv has the build function right now. \n\nDYNAMIC SPRITES:\nUnit and most images are dynamimc.\n\nOCTALDIRECTIONAL SCROLLING:\nMove mouse to edges of map to scroll or use arrow keys. Just like the original version!\n\nBOX SELECTION:\nSelect units en masse. Drag from UPPER LEFT to LOWER RIGHT to draw the box.\n\nUNIQUE SOUNDS:\nStraight from the game.\n\nOPEN SOURCE: Still working on setting up git. \nGet the code at\nhttps://github.com/ansonl/SCIAF\nor email me at\nsupport@apparentetch.com\nfor the source. Better to email for the most current code.\n\nIt would be best that the browser window be greater than 1024 x 768 and at the same ratio, 4:3. ');

}