
// Canvas Draw --------------------------------------

const canvas = document.querySelector('#canvas');
const canvas_container = document.getElementsByClassName('board-container')[0];
document.getElementById('menu_pen').addEventListener('click',()=>{setMode(1)});
document.getElementById('menu_eraser').addEventListener('click',()=>{setMode(2)});
document.getElementById('menu_pointer').addEventListener('click',()=>{setMode(3)});
document.getElementById('menu_undo').addEventListener('click',()=>{Undo()});
document.getElementById('menu_redo').addEventListener('click',()=>{Redo()});
colors.forEach(element => { element.addEventListener('click',(e)=>{setBrushColor(e.toElement)})});



function JoinRoom(room){
    console.log('Joining Room:',room)
}

var undo_array = []
var redo_array =[]
var me = {
    name:"Me",
    id:"",
    pos: { x: 0, y: 0 },
    brush_down: false,
    brushing:false,
    mode:"pen",
    pre_pos: { x: 0, y: 0 },
    brush_size: 5,
    brush_color: "#1d809f",
    undo_array:[],
    redo_array:[],
    stroke_array:[],
    ctx:canvas.getContext('2d'),
    is_peer:false
}

let peer = {
    name:"Jane",
    id:"",
    pos: { x: 0, y: 0 },
    brush_down: false,
    brushing:false,
    mode:"pen",
    pre_pos: { x: 0, y: 0 },
    brush_size: 5,
    brush_color: "red",
    undo_array:[],
    redo_array:[],
    stroke_array:[],
    ctx:canvas.getContext('2d'),
    is_peer:true
}

var Peers=[];

window.addEventListener('load', () => {
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', selfDraw);
    canvas.addEventListener('touchstart', (e)=>{
        let x;
        if(e.touches.length==1){
            var touch_single=true;
            if(touch_single){
                startMobilePainting(e)
                clearTimeout(x);
            }else{
                x = setTimeout(()=>{touch_single=false},200)
            }
        }
    });
    canvas.addEventListener('touchend', startMobilePainting)
    canvas.addEventListener("touchmove", function (e) {
        
        //if (!me.brush_down) { startMobilePainting(e) }
        if(e.touches.length==1){
            var touch_single=true;
            if(touch_single){
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                selfDraw(mouseEvent)
            }
            
        }
        //alert(JSON.stringify(e.touches))
        //
    }, false);
});



function getPosition(event) {
    var x = event.clientX - canvas_container.offsetLeft + canvas_container.scrollLeft;
    var y = event.clientY - canvas_container.offsetTop + canvas_container.scrollTop;
    return [x, y]
}
function startPainting(event) {
    me.brush_down = true;
    PushToUndo();
    ClearRedo();
    BroadCast("draw-start",me.id,"");
    [me.pre_pos.x, me.pre_pos.y] = getPosition(event);
    selfDraw(event);
}
function startMobilePainting(event) {
    me.brush_down = true;
    PushToUndo();
    ClearRedo();
    BroadCast("draw-start",me.id,"");
    [me.pre_pos.x, me.pre_pos.y] = getPosition(event.touches);
}
function pre_pos(who) {
    who.pre_pos.x = who.pos.x;
    who.pre_pos.y = who.pos.y;
}

function stroke_array(who,pos){
    who.stroke_array.push(pos);
}

function stopPainting() { me.brush_down = false; BroadCast("draw-stop",me.id,"");}

function selfDraw(event){
    if (!me.brush_down) return;
    stroke_array(me,getPosition(event))
    sketch(me)
    me.brushing=true;
    BroadCast('draw-pos',me.id,me.pos)
}

function PointerMode(state){
    if(state){
        canvas.style.cursor = 'auto'
    }else{
        canvas.style.cursor = 'crosshair';
    }
}

function setMode(mode){
    modeIcons=['<i class="fa fa-bars"></i>','<i class="fa fa-pen"></i>','<i class="fa fa-eraser"></i>','<i class="fa fa-mouse-pointer"></i>'];
    modes = ["view","pen","eraser","mouse"];
    if(mode<4){
        me.mode=modes[mode];
        document.getElementsByClassName('btn-main')[0].innerHTML = modeIcons[mode];
    }
    if(modes[mode]=="mouse"){
        PointerMode(true)
    }else{
        PointerMode(false)
    }
    BroadCast('ptr-mode',me.id,[me.mode,me.brush_color])
}

function setBrushColor(ele){
    me.brush_color = ele.title;
    document.getElementById('dropdownMenuButton').style.background = ele.title;
}

function BroadCast(mode,who_id,what){
    console.log(mode,who_id,what);
}
    

function sketch(who) {
    who.ctx.beginPath();
    who.ctx.lineCap = 'round';
    who.ctx.strokeStyle = who.brush_color;
    who.ctx.lineWidth = who.brush_size;
    if(who.mode=="pen"){
        if(who.is_peer){
            [who.pre_pos.x, who.pre_pos.y] = who.stroke_array[0];
        }
        who.ctx.globalCompositeOperation="source-over";
        while(who.stroke_array.length>0){
            [who.pos.x,who.pos.y] = who.stroke_array.shift()
            who.ctx.moveTo(who.pre_pos.x, who.pre_pos.y);
            pre_pos(who)  
            //console.log(who.pos);
            who.ctx.lineTo(who.pos.x, who.pos.y);
            who.ctx.stroke();
        }
    
    }else if(who.mode=="eraser"){
        who.ctx.globalCompositeOperation="destination-out";
        while(who.stroke_array.length>0){
            who.ctx.strokeStyle = false;
            who.ctx.lineWidth = 20;
            [who.pos.x,who.pos.y] = who.stroke_array.shift()
            who.ctx.moveTo(who.pre_pos.x,who.pre_pos.y);
            pre_pos(who)
            //console.log("Erasing");
        }
        who.ctx.lineTo(who.pos.x, who.pos.y);
        who.ctx.stroke(); 
    }
    who.brushing=false;
    who.stroke_array=[]
}


// Both Peer and Me Functions
function PushToUndo(){
    if(undo_array.length>=5){
       undo_array.shift()
    }
    undo_array.push(canvas.toDataURL());
}

function PushToRedo(what){
    if(redo_array.length>=5){
       redo_array.shift()
    }
    redo_array.push(what)
}

function ClearRedo(){
    redo_array=[]
}

function Undo(){
    PushToRedo(canvas.toDataURL());
    if(undo_array.length<=0){return}
    var img = new Image;
    ClearCanvas()
    img.src = undo_array.pop()
    img.onload = function(){
        me.ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    PushToRedo(img.src);
}

function Redo(){
    PushToUndo(canvas.toDataURL())
    if(redo_array.length<=0){return}
    var img = new Image;
    ClearCanvas()
    img.src = redo_array.pop()
    img.onload = function(){
        me.ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    PushToUndo(img.src)
}


function ClearCanvas(){
    me.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

