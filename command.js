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

//play file as secondary interface effect
function playInterfaceEffect2(file) 
{
	document.getElementById('interfaceeffects2').src = 'sounds/' + file;
	var interfaceeffects2 = document.getElementById('interfaceeffects2');
	interfaceeffects2.play();
}

function build1image() {

	for (unitArrayAmount=unitArray.length-1;unitArrayAmount>=1;unitArrayAmount--)
	{
		var unitElement = 'scv'+unitArrayAmount+'selected';
		var selectedStatus = eval(unitElement);

		if(selectedStatus=='1')
		{	
		eval('scv' + unitArrayAmount + 'buildingMode = 1');
		mapCursor('academy/academyplc.png');
			
		playInterfaceEffect('button.mp3');

		unitArrayAmount = 1; //stop scanning as we already have one scv to set to build
		}
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