var mouseCursor;
mouseCursor = document.getElementById("cursor");
var lis = document.querySelectorAll("li");

window.addEventListener("mousemove", cursor);

function cursor(e)
{
	mouseCursor = document.getElementById("cursor");
	mouseCursor.style.top = e.pageY + "px";
	mouseCursor.style.left = e.pageX + "px";
	mouseCursor.style.backgroundColor = "Red";
	mouseCursor.style.cursor = "none";
}