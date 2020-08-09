/*
var drags = document.getElementsByClassName("drag")
for (drag of drags){
  dragElement(drag);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

window.addEventListener('load', ()=>{

    resize(); // Resizes the canvas once the window loads
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', Mysketch);
    window.addEventListener('resize', resize);
});


function resize(){
  ctx.canvas.width = window.innerWidth;
//   var temp_cnvs = document.createElement('canvas');
//     var temp_cntx = temp_cnvs.getContext('2d');
//     w = canvas.parentElement.innerWidth;
//     h = canvas.parentElement.innerHeight;
//     console.log(canvas.parentElement.style.width);
// // set it to the new width & height and draw the current canvas data into it //
//     temp_cnvs.width = w;
//     temp_cnvs.height = h;
//     // temp_cntx.fillStyle = 'black';  // the original canvas's background color
//     temp_cntx.fillRect(0, 0, w, h);
//     temp_cntx.drawImage(canvas, 0, 0);
// // resize & clear the original canvas and copy back in the cached pixel data //
//     ctx.canvas.width = w;
//     ctx.canvas.height = h;
//     ctx.drawImage(temp_cnvs, 0, 0);
}

// Stores the initial position of the cursor
let coord = {x:0 , y:0};

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

function getPosition(event){
  var rect  = ctx.canvas.getBoundingClientRect();
  coord.x = event.clientX - rect.left;
  coord.y = event.clientY - rect.top;
}
function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}

LineColor = 'green';
LineThickness = 2;
LineTip='round';
background='black';

function clearCanvas() {
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width);
}

function Mysketch(event){
  if (!paint) return;
  ctx.beginPath();
  ctx.lineWidth = document.getElementById('tipSize').value;
  ctx.lineCap = LineTip;
  ctx.strokeStyle = LineColor;
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}

firstPoint=false;
prev = {x:0,y:0};

function Getsketch(x,y){
  if(firstPoint){
    prev.x = x;
    prev.y = y;
    firstPoint=false;
    return;
  }else{
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
    ctx.moveTo(prev.x, prev.y);
    //newcoords venam!
    ctx.lineTo(x , y);
    ctx.stroke();
  }
}
