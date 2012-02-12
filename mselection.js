var mouseDown = 0;
var boxSelection = 0;

document.onmousedown = mouseDownEvent;

document.getElementById('map').onmouseup = mouseUpEvent;

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
	console.log('mousemoved');
	if (mouseDown == 1 && boxSelection == 0)
	{
		//Show box selection div
		new Effect.Move('boxselection', { x: window.event.clientX+window.pageXOffset, y: window.event.clientY+window.pageYOffset, mode: 'absolute',duration:0, transition: Effect.Transitions.linear,fps: 50,queue: { position: 'end', scope: 'cursor', limit:1} });
		document.getElementById('boxselection').style.left = window.event.clientX+window.pageXOffset;
		document.getElementById('boxselection').style.top = window.event.clientY+window.pageYOffset;
		document.getElementById('boxselection').style.opacity = 0.3;
		boxSelection = 1;
		console.log('Box Selection started');
		if(scvid = scv1image)
		{
			scv1selected=0;
		}
		if(scvid = scv2image)
		{
			scv2selected=0;
		}
		if(scvid = scv3image)
		{
			scv3selected=0;
		}
		if(scvid = scv4image)
		{
			scv4selected=0;
		}
	}

	if (mouseDown == 1 && boxSelection == 1)
	{
		document.getElementById('boxselection').style.width = window.event.clientX+window.pageXOffset - document.getElementById('boxselection').offsetLeft;
		document.getElementById('boxselection').style.height = window.event.clientY+window.pageYOffset - document.getElementById('boxselection').offsetTop;

		//for all items in unitArray except item 0
		for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
		{
			//what is selected unit's element id?
			var unitElement = 'scv'+unitArrayAmount+'image';

			//check if unit coordinates are in box
			if(document.getElementById(unitElement).offsetLeft+36 > document.getElementById('boxselection').offsetLeft+36 && document.getElementById(unitElement).offsetLeft < window.event.clientX+window.pageXOffset && document.getElementById(unitElement).offsetTop+36 > document.getElementById('boxselection').offsetTop && document.getElementById(unitElement).offsetTop+36 < window.event.clientX+window.pageYOffset)
			{

				console.log('in x of scv' + unitArrayAmount + 'image');
				
				//select appropriate unit
				if(unitElement == 'scv1image')
				{
					scv1selected = 1;
					console.log(unitElement);
				}
				if(unitElement == 'scv2image')
				{
					scv2selected = 1;
					console.log(unitElement);
				}
				if(unitElement == 'scv3image')
				{
					scv3selected = 1;
					console.log(unitElement);
				}
				if(unitElement == 'scv4image')
				{
					scv4selected = 1;
					console.log(unitElement);
				}

			}
			else
			{
				//deselect appropriate unit
				if(unitElement == 'scv1image')
				{
					scv1selected = 0;
					console.log(unitElement);
				}
				if(unitElement == 'scv2image')
				{
					scv2selected = 0;
					console.log(unitElement);
				}
				if(unitElement == 'scv3image')
				{
					scv3selected = 0;
					console.log(unitElement);
				}
				if(unitElement == 'scv4image')
				{
					scv4selected = 0;
					console.log(unitElement);
				}
			}
		}
	}
}