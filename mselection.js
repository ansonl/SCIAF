var mouseDown = 0;
var boxSelection = 0;

document.onmousedown = mouseDownEvent;

document.getElementById('map').onmouseup = mouseUpEvent;
document.getElementById('console').onmouseup = mouseUpEvent;

document.getElementById('map').onmousemove = mouseMovedEvent;

function mouseDownEvent()
{
	console.log('mousedown');
	mouseDown = 1;
}

function mouseUpEvent()
{
	console.log('mouseup');
	mouseDown = 0;

	//Hide box selection div
	document.getElementById('boxselection').style.opacity = 0;
	document.getElementById('boxselection').style.width = 10;
	document.getElementById('boxselection').style.height = 10;
	boxSelection = 0;
	console.log('Box Selection ended');
}

function mouseMovedEvent()
{
	 var consoleWidth = window.innerWidth; //basically width of window
     var consoleTopOffset = window.innerHeight-187; //window height - 187 since console is 187px high
	//check if mouse is out of console
	if (mouseDown == 1 && boxSelection == 0 && window.event.clientX+window.pageXOffset > document.getElementById('console').offsetLeft && window.event.clientX+window.pageXOffset < document.getElementById('console').offsetLeft+consoleWidth && window.event.clientY+window.pageYOffset < consoleTopOffset && window.event.clientY+window.pageYOffset > 0)
	{
		//Show box selection div
		new Effect.Move('boxselection', { x: window.event.clientX+window.pageXOffset, y: window.event.clientY+window.pageYOffset, mode: 'absolute',duration:0, transition: Effect.Transitions.linear,fps: 50,queue: { position: 'end', scope: 'cursor', limit:1} });
		document.getElementById('boxselection').style.left = window.event.clientX+window.pageXOffset;
		document.getElementById('boxselection').style.top = window.event.clientY+window.pageYOffset;
		document.getElementById('boxselection').style.opacity = 0.3;
		boxSelection = 1;
		console.log('Box Selection started');
		
		//deselect all scvs
		for (unitArrayAmount2=unitArray.length-1;unitArrayAmount2>=1;unitArrayAmount2--)
		{
			var unitElement2 = 'scv'+unitArrayAmount2;
			eval(unitElement2 + 'selected' + '=' + '0');
			console.log('Deselected=' + unitElement2);
		}

		//set portrait
		portrait('blank.png');	
		//hide commands
		movementCommands('hidden');
		buildCommands('hidden');	
	}

	if (mouseDown == 1 && boxSelection == 1)
	{
		document.getElementById('boxselection').style.width = window.event.clientX+window.pageXOffset - document.getElementById('boxselection').offsetLeft;
		document.getElementById('boxselection').style.height = window.event.clientY+window.pageYOffset - document.getElementById('boxselection').offsetTop;
		
		//clear portrait image
		portrait('blank.png');

		//for all items in unitArray except item 0
		for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
		{
			//what is selected unit's element id?
			var unitElement = 'scv'+unitArrayAmount;

			//check if unit coordinates are in box
			if(document.getElementById(unitElement).offsetLeft+36 > document.getElementById('boxselection').offsetLeft && document.getElementById(unitElement).offsetLeft+36 < window.event.clientX+window.pageXOffset && document.getElementById(unitElement).offsetTop+36 > document.getElementById('boxselection').offsetTop && document.getElementById(unitElement).offsetTop+36 < window.event.clientX+window.pageYOffset)
			{

				eval(unitElement + 'selected' + '=' + '1');
				console.log('Selected=' + unitElement);

		

				//random scv what sound
				var randomSoundtrack = Math.floor(Math.random()*2);
				console.log("Random scv WHAT voice: "+randomSoundtrack);
				document.getElementById('unitvoice').src = 'sounds/scv/TSCWht0'+randomSoundtrack+'.mp3';
				var whatvoice = document.getElementById('unitvoice');
				whatvoice.play();	
				//set portrait
				portrait('scv.png');	
				//show commands
				movementCommands('visible');
				buildCommands('visible');	
			}
			else //deselect if unit not in box
			{
				eval(unitElement + 'selected' + '=' + '0');
				console.log('Deselected=' + unitElement);
			}		
		}
	}
}