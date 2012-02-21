var numberOfSCV = 4;

function makeSCV(ccid)
{
	//increase scv counter var
	numberOfSCV++;
	//make new vars for new scv	
	eval('window.scv' + numberOfSCV + 'building' + '=' + '0');
	eval('window.scv' + numberOfSCV + 'move' + '=' + '0');	
	eval('window.scv' + numberOfSCV + 'selected' + '=' + '0');
	
	//create div for scv
	newSCV = document.createElement('div'); 
	//set scv div ID by instance
	newSCVId = 'scv' + numberOfSCV;
	newSCV.setAttribute('id', newSCVId);
	//set sc dimensions
	newSCV.style.width = 72;
	newSCV.style.height = 72;
	//set scv background. Dimensions must be set or bg will repeat.
	newSCV.style.background = "url('images/scv/180.png')"; //set scv image as the div bg

document.getElementById('map').appendChild(newSCV);
		
	//move to origin
	new Effect.Move(newSCVId, { x: 0, y: -document.getElementById(newSCVId).offsetTop, mode: 'relative', duration:0 });

	//set cursor
	document.getElementById(newSCVId).style.cursor = 'url(images/cursor/magnifier.gif)';
		
	//add building to array
	unitArray[numberOfSCV]=newSCV;


}