var scrollLeftDownTimer;
var scrollLeftTimer;
var scrollLeftUpTimer;
var scrollUpTimer;
var scrollRightUpTimer;
var scrollRightTimer;
var scrollRightDownTimer;
var scrollDownTimer;
scrollingLeftDown = 0;
scrollingLeft = 0;
scrollingLeftUp = 0;
scrollingUp = 0;
scrollingRightUp = 0;
scrollingRight = 0;
scrollingRightDown = 0;
scrollingDown = 0;

var scrollrate = 50;
var scrolltimeout = 50;

function scrollTimer()
{
scrollLeftDownTimer=setTimeout("scrollLeftDown()",scrolltimeout);
scrollLeftTimer=setTimeout("scrollLeft()",scrolltimeout);
scrollLeftUpTimer=setTimeout("scrollLeftUp()",scrolltimeout);
scrollUpTimer=setTimeout("scrollUp()",scrolltimeout);
scrollRightUpTimer=setTimeout("scrollRightUp()",scrolltimeout);
scrollRightTimer=setTimeout("scrollRight()",scrolltimeout);
scrollRightDownTimer=setTimeout("scrollRightDown()",scrolltimeout);
scrollDownTimer=setTimeout("scrollDown()",scrolltimeout);
}

function scrollLeftDown()
{
	if (scrollingLeftDown == 1)
	{
		window.scrollBy(-scrollrate,scrollrate);
	}
	scrollLeftDownTimer=setTimeout("scrollLeftDown()",scrolltimeout);
}

function scrollLeft()
{
	if (scrollingLeft == 1)
	{
		window.scrollBy(-scrollrate,0);
	}
	scrollLeftTimer=setTimeout("scrollLeft()",scrolltimeout);
}

function scrollLeftUp()
{
	if (scrollingLeftUp == 1)
	{
		window.scrollBy(-scrollrate,-scrollrate);
	}
	scrollLeftUpTimer=setTimeout("scrollLeftUp()",scrolltimeout);
}

function scrollUp()
{
	if (scrollingUp == 1)
	{
		window.scrollBy(0,-scrollrate);
	}
	scrollUpTimer=setTimeout("scrollUp()",scrolltimeout);
}

function scrollRightUp()
{
	if (scrollingRightUp == 1)
	{
		window.scrollBy(scrollrate,-scrollrate);
	}
	scrollRightUpTimer=setTimeout("scrollRightUp()",scrolltimeout);
}

function scrollRight()
{
	if (scrollingRight == 1)
	{
		window.scrollBy(scrollrate,0);
	}
	scrollRightTimer=setTimeout("scrollRight()",scrolltimeout);
}

function scrollRightDown()
{
	if (scrollingRightDown == 1)
	{
		window.scrollBy(scrollrate,scrollrate);
	}
	scrollRightDownTimer=setTimeout("scrollRightDown()",scrolltimeout);
}

function scrollDown()
{
	if (scrollingDown == 1)
	{
		window.scrollBy(0,scrollrate);
	}
	scrollDownTimer=setTimeout("scrollDown()",scrolltimeout);
}

document.getElementById('leftdownarrow').onmouseover = function() {
	scrollingLeftDown = 1;
}

document.getElementById('leftdownarrow').onmouseout = function() {
	scrollingLeftDown = 0;
}

document.getElementById('leftarrow').onmouseover = function() {
	scrollingLeft = 1;
}

document.getElementById('leftarrow').onmouseout = function() {
	scrollingLeft = 0;
}

document.getElementById('leftuparrow').onmouseover = function() {
	scrollingLeftUp = 1;
}

document.getElementById('leftuparrow').onmouseout = function() {
	scrollingLeftUp = 0;
}

document.getElementById('uparrow').onmouseover = function() {
	scrollingUp = 1;
}

document.getElementById('uparrow').onmouseout = function() {
	scrollingUp = 0;
}

document.getElementById('rightuparrow').onmouseover = function() {
	scrollingRightUp = 1;
}

document.getElementById('rightuparrow').onmouseout = function() {
	scrollingRightUp = 0;
}

document.getElementById('rightarrow').onmouseover = function() {
	scrollingRight = 1;
}

document.getElementById('rightarrow').onmouseout = function() {
	scrollingRight = 0;
}

document.getElementById('rightdownarrow').onmouseover = function() {
	scrollingRightDown = 1;
}

document.getElementById('rightdownarrow').onmouseout = function() {
	scrollingRightDown = 0;
}

document.getElementById('downarrow').onmouseover = function() {
	scrollingDown = 1;
}

document.getElementById('downarrow').onmouseout = function() {
	scrollingDown = 0;
}