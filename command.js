//change unit portrait to 'file' variable
function portrait(file) 
{
	document.getElementById('portraitimage').src = 'images/portraits/' + file;
}

//change map cursor file
function mapCursor(file) 
{
	document.getElementById('map').style.cursor = 'url(images/' + file + ')';
}

//change build command visibility
function buildCommands(state) 
{
	document.getElementById('build1image').style.visibility = state;
}
function movementCommands(state) 
{
	document.getElementById('stopimage').style.visibility = state;
}

//play file as interface effect
function playInterfaceEffect(file) 
{
	document.getElementById('interfaceeffects').src = 'sounds/' + file;
	var interfaceeffects = document.getElementById('interfaceeffects');
	interfaceeffects.play();
}

function build1image() {
	//if(scv1selected==1||scv2selected==1||scv3selected==1||scv4selected==1)	
	if(scv1selected==1)	
	{	
		buildingMode = 1;
		mapCursor('academy/academyplc.png');
			
		playInterfaceEffect('button.mp3');
	}
	else
	{
		playInterfaceEffect('buzz.mp3');
	}
}

function stopMovement() {

	playInterfaceEffect('button.mp3');	

	//check which scvs are selected
	for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
	{
		var unitElement = 'scv'+unitArrayAmount+'selected';
		var selectedStatus = eval(unitElement);

		if(selectedStatus=='1')
		{
			console.log(unitArrayAmount);
			//cancel that unit's scope queue
			Effect.Queues.get('scv' + unitArrayAmount + 'scope').invoke('cancel');
		}	
	}
}