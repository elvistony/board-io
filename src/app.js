const P2PT = require('p2pt')
const rs = require('randomstring')

var room= 'homeroom'
var username= prompt("Enter a Nickname", "Jack")
var peers = {}

var playerDiv = document.getElementById('players')
var solo=true

var Debug=true;

//----------------------------------------------Checking if Site is First Launch
var unique_id = getCookie('unique_id')
if(unique_id==""){
    dlog("First Launch - Generating ID")
    var new_id =  rs.generate(10)
    unique_id=new_id;
    setCookie('unique_id',new_id, 7)
    dlog("Unique ID = "+new_id)
}else{
    alert('Welcome Back '+unique_id)
    dlog("Unique ID already Exists : "+unique_id)
}

// // Primary Functions
// function NewRoom() {
//     //Generate Meeting ID 
//     room.value=rs.generate(9)
//     //var hostSecret = CreateKey()
// }

//----------------------------------------------

// //Loading The URL Hash
// var hashcode = window.location.hash
// if(hashcode.length<=1){
//     dlog("General Mode - Showing both Options")
//     //General Mode - No hash - showing Both options
//     hostDiv.style.display='block'
//     jointDiv.style.display='block'
// }else if(hashcode.substring(1,5)=="host"){
//     var pre_session_id = getCookie('active_room_id')
//     if(pre_session_id!=""){
//     dlog("Host Mode - Prev Session present")
//     // Host mode with Prev Session
//     //send the sorry-ticket and generate a new one and send to peers
//     //Check Cookies
//     }else{
//     dlog("Host Mode - Showing New Room Form")
//     // Host mode - New Session
//     hostDiv.style.display='block'
//     //Show New Meet Creation Form
//     }
// }else{
//     // Join Mode
//     dlog("Peer Mode - Showing Peer form")
//     jointDiv.style.display='block'
//     room.value = hashcode.substring(1,hashcode.length)
// }

var logo = document.getElementById('logo')
var members={}

logo.addEventListener('click',joinChat)

function joinChat () {
    var uname = username
    var rcode = room
    if (rcode.trim() === '' || uname.trim() === '') {
        alert('enter Nickname')
        return
    }
    init()
    dlog(uname+` joined the chat`)
    listen()
}



function sendMessage(){
    var newmsg = msg;
    const pack = {
    type:'msg',
    username: username,
    message: newmsg
    }
    Broadcast2All(peers,pack)
    feed.push(message)
}


//-----------------------------------------------------------
//Announce 
function init () {
    logo.classList.add('w3-orange')
    let announceURLs = [
    "wss://tracker.sloppyta.co:443/announce",
    "wss://tracker.novage.com.ua:443/announce",
    "wss://tracker.btorrent.xyz:443/announce",
    ]
    p2pt = new P2PT(announceURLs, 'boardio' + this.room)
}

//Broadcast to All
function Broadcast2All(peers,pack){
    for (var key in peers) {
        send2Peer(peers[key],pack)
    }
}



//SendtoPeer
function send2Peer (peer,message) {
    console.log(message);
    p2pt.send(peer, JSON.stringify(message))
}

//Getting Feed
function listen () {
    p2pt.on('peerconnect', (peer) => {
        solo=false
        peers[peer.id] = peer;
        console.log(peer);
        //sending Intro msg
        send2Peer(peer,{
            type:'msg',
            name:username
        })

    })
    p2pt.on('peerclose', (peer) => {
        console.log(peer.id+" disconnected");
        delete peers[peer.id]
        delete members[peer.id]
    })

    p2pt.on('msg', (peer, msg) => {
        msg = JSON.parse(msg)
        console.log(msg);
        if(msg.type=="msg"){
            if(!members[peer.id]){
                members[peer.id]=msg.name;
                addPeer(peer.id)
            }
            console.log(msg);
        }else{
            if(msg.type=='brushset'){
                UpdatePeerBrush(peer.id,msg)
            }else if(msg.type=="stroke"){
                DrawPeerStrokes(peer.id,msg)
            }else if(msg.type=="brushchange"){
                UpdatePeerBrushProp(peer.id,msg)
            }else{
                console.log(msg);
            }
            
        }
    })


    p2pt.start()
}



//------------------------------------------------------------------------

function dlog(msg) {
    if(Debug){
    console.log(msg);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}


//Draw.js ---- Expansion

var my_brushColor = 'blue'
var my_brushThickness = 2

function setBrushColor(color) {
    my_brushColor=color
    if(!solo){
        SendMyBrushChange()
    }
}

function setBrushThick(me) {
    my_brushThickness=me.value
    SendMyBrushChange()
}

function SendMyBrushChange() {
    Broadcast2All(peers,{
        type:'brushchange',
        color:my_brushColor,
        thick:my_brushThickness
    })
}


canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
peerCTXs = {}
peerBrushProps = {}

function addPeerBrush(peer_id) {
    peerCTXs[peer_id]=canvas.getContext('2d');
    peerBrushProps[peer_id]={
        'color':'orange',
        'thick':2
    }
}


let my_coord = {x:0 , y:0};
var peerBrush={} 
/* 
{
    'abc':true //brush down 

}
*/

window.addEventListener('load', ()=>{
    resize(); // Resizes the canvas once the window loads
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', myStrokes);
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

function resize(){
    ctx.canvas.width = window.innerWidth;
}

function addPeer(id) {
    addPeerBrush(id)
    playerDiv.innerHTML+=`<span> &#9679; `+members[id]+`</span>`
}


var my_brush=false 

function getPosition(event){
    var rect  = ctx.canvas.getBoundingClientRect();
    my_prev=my_coord
    my_coord.x=event.clientX - rect.left
    my_coord.y=event.clientY - rect.top
  }


function startPainting(event) {
    getPosition(event)
    my_brush=true
    if(!solo){
        SendBrushUpdate(my_brush)
    }
}

function stopPainting(event) {
    getPosition(event)
    my_brush=false
    if(!solo){
        SendBrushUpdate(my_brush)
    }
}

var my_prev={}

function myStrokes(event) {
    //my_prev = my_coord
    if(my_brush){
        drawStroke(2,'round','blue',my_prev,my_coord,ctx)
    }
    getPosition(event)
    if(!solo){
        //send strokes too
        SendMoves()
    }
}

function SendBrushUpdate(now){
    Broadcast2All(peers,{
        type:'brushset',
        brush:now
    })
}

function SendMoves() {
    if(my_brush){
        Broadcast2All(peers,{
            type:'stroke',
            x:my_coord.x,
            y:my_coord.y
        })
    }
}





function drawStroke(lW,lC,sS,from,to,cctx){
    cctx.beginPath();
    cctx.lineWidth = lW
    cctx.lineCap = lC;
    cctx.strokeStyle = sS;
    cctx.moveTo(from.x,from.y)
    cctx.lineTo(to.x , to.y);
    cctx.stroke();
  }

//Recieving Data--------------------------------------
function DrawPeerStrokes(id,msg) {
    if(peerBrush[id]){
        drawStroke(peerBrushProps[id]['thick'],'round',peerBrushProps[id]['color'],peerBrush[id],msg,peerCTXs[id])
    }
    peerBrush[id]={
        x:msg.x,
        y:msg.y
    }
}

function UpdatePeerBrush(id,msg) {
    peerBrush[id]=msg.now
}

function UpdatePeerBrushProp(id,msg) {
    peerBrushProps[id]['color']=msg.color
    peerBrushProps[id]['thick']=msg.thick
}