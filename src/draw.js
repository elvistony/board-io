canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

window.addEventListener('load', ()=>{
    resize(); // Resizes the canvas once the window loads
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', Mysketch);
    canvas.addEventListener("touchmove", function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);
    window.addEventListener('resize', resize);
});


//SENDING SIDE
strokes = 0;
end = true;
ini=true;

function SendStrokes(strok,x,y){
  if(ini){
    hub.broadcast(RoomCode,"set "+LineColor+" "+document.getElementById('tipSize')+" "+LineTip+" "+x+" "+y);
    ini=false;
  }else{
    console.log(x,y);
    hub.broadcast(RoomCode,x+" "+y);
  }
}

function GetStrokes(res){
  sets = String(res).split(" ")
  if(sets.length>2){
    LineColor = sets[1];
    LineThickness = sets[2]*1;
    LineTip=sets[3];
    setPrevPoint(sets[4],sets[5])
    console.log(String(res));
  }else if(sets.length==2){
    firstPoint=false;
    Getsketch(sets[0],sets[1])
  }else {
    if(res=="endline"){
    }
    document.getElementById('messages').textContent +=res+'\n';
  }
}

function SendStrokesAfterCheck(strokes,x,y) {
  if(true){
    SendStrokes(strokes,x,y);
  }else{
    console.log("Peer Offline");
  }
}

function resize(){
  ctx.canvas.width = window.innerWidth;
}

let coord = {x:0 , y:0};
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
  ini = true;
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
  SendStrokesAfterCheck(strokes,coord.x,coord.y)
  ctx.stroke();
}

prev = {x:0,y:0};

function setPrevPoint(x,y) {
  //console.log("Set New Line",x,y);
    prev.x = x;
    prev.y = y;
}

function Getsketch(x,y){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
    ctx.moveTo(prev.x, prev.y);
    //newcoords venam!
    ctx.lineTo(x , y);
    prev.x=x;
    prev.y=y;
    ctx.stroke();
}

// Open and close sidebar
function openNav() {
  document.getElementById("mySidebar").style.width = "60%";
  document.getElementById("mySidebar").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidebar").style.display = "none";
}
