var canvas, ctx, saveButton, clearButton;
var pos = {x:0, y:0};
var rawImage;
var model;

function setPosition(e){
	pos.x = e.clientX - canvas.offsetLeft; //e.clientX-100;
	pos.y = e.clientY - canvas.offsetTop;  //#e.clientY-100;
}
    
function draw(e) {
	if(e.buttons!=1) return;
	ctx.beginPath();
	ctx.lineWidth = 24;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'white';
	ctx.moveTo(pos.x, pos.y);
	setPosition(e);
	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
	rawImage.src = canvas.toDataURL('image/png');
}
    
function erase() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
}
    
function postAjax(url, data, success) {
	    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	    xhr.open('POST', url);
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
	    };
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.send(data);
	    return xhr;
	}

function save() {
	postAjax('http://localhost:5000/predict_api', rawImage.src, function(response){ 
		alert(response); 
	});
}
    
async function init() {
	canvas = document.getElementById('canvas');
	rawImage = document.getElementById('canvasimg');
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener("mousedown", setPosition);
	canvas.addEventListener("mouseenter", setPosition);
	saveButton = document.getElementById('sb');
	saveButton.addEventListener("click", save);
	clearButton = document.getElementById('cb');
	clearButton.addEventListener("click", erase);
}

document.addEventListener('DOMContentLoaded', init);


    
