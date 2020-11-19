const P2PT = require('p2pt')
const rs = require('randomstring')

var room= 'homeroom'
var username= 'Anu'
var peers = {}


//Initializing DOM Elements
var playerDiv = document.getElementById('players')
var tip =       document.getElementById('tip')

document.getElementById('intro-modal').style.display='block';
document.getElementById('joinRoom').addEventListener('click',joinRoom)
document.getElementById('genRoomCode').addEventListener('click',NewRoom)
document.getElementById('ModalOpen').addEventListener('click',openModal)
document.getElementById('copyCode').addEventListener('click',copyCode)
document.getElementById('clearAll').addEventListener('click',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
})
document.getElementById('tipUp').addEventListener('click',function(){
    setBrushThick(BrushTipSize)
    BrushSize(1)
})
document.getElementById('tipDown').addEventListener('click',function(){
    BrushSize(-1)
    setBrushThick(BrushTipSize)
})

window.onbeforeunload = function(event) {
    event.returnValue = "Your Board will be Cleared if you Reload, Continue?";
};


// Variable Settings
var solo=true;
var Debug=false;
var members={}


//Brush settings
var BrushTipSize = 1
tip.style.fontSize =5

/*
Connection Establishment Functions----------------------------
*/

// Primary Functions
function NewRoom() {
    var nick = document.getElementById('newRoomNick').value
    username=nick
    if(nick.trim() === ''){
        alert('Enter Nickname')
    }else{
        room=rs.generate(9)
        document.getElementById('genRoomCode').style.display='none';
        document.getElementById('newRoomCode').value=room
        document.getElementById('DispRoom').innerText=room
        joinChat()
    }
}

function openModal(){
    IntroModal.style.display='block'
    openPage('pg1')
}

function copyCode() {
    var copyText = document.getElementById("newRoomCode");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
}

var colors = document.getElementsByClassName('colorPallete')
for (const color of colors) {
    color.addEventListener('click',function (){
        var clr = this.getAttribute("value");
        console.log(clr);
        setBrushColor(clr)
    })
}

function joinRoom(){
    var uname = document.getElementById('joinNick').value
    var rcode = document.getElementById('joinRoomCode').value
    if(rcode.trim() === '' || uname.trim() === ''){
        alert("Room Code or Nickname Empty")
    }else{
        room = rcode
        document.getElementById('DispRoom').innerText=rcode
        joinChat()
    }
    username=uname
    IntroModal.style.display='none';
}



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
        document.getElementById(peer.id).outerHTML=""
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

function dlog(msg) {
    if(Debug){
    console.log(msg);
    }
}

//Brush Related Functions

var my_brushColor = 'blue'
var my_brushThickness = 2

function BrushSize(v){
    BrushTipSize = BrushTipSize-v;
    tip.style.fontSize=2+BrushTipSize;
}

function setBrushColor(color) {
    my_brushColor=color
    //If Multi-player - send Brush Change to Peer
    if(!solo){
        SendMyBrushChange()
    }
}

function setBrushThick(me) {
    my_brushThickness=me
    SendMyBrushChange()
}

function SendMyBrushChange() {
    Broadcast2All(peers,{
        type:'brushchange',
        color:my_brushColor,
        thick:my_brushThickness
    })
}


//Canvas Related Functions

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Peer Canvas Control Elements
var peerCTXs = {}
var peerBrushProps = {}
let my_coord = {x:0 , y:0};
var peerBrush={} 
var my_brush=false 


//Add a New Peer to the Board
function addPeer(id) {
    addPeerBrush(id)
    playerDiv.innerHTML+=`<span class="w3-text-orange" id="`+id+`"> &#9679; `+members[id]+`</span>`
}
function addPeerBrush(peer_id) {
    peerCTXs[peer_id]=canvas.getContext('2d');
    peerBrushProps[peer_id]={
        'color':'orange',
        'thick':2
    }
}



//Canvas Drawing Listeners

window.addEventListener('load', ()=>{
    resize(); // Resizes the canvas once the window loads
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('touchstart',startPainting)
    canvas.addEventListener('touchend',stopMobilePainting)
    canvas.addEventListener('mousemove', myStrokes);
    canvas.addEventListener("touchmove", function (e) {
      var touch = e.touches[0];
      my_brush=true
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);
    window.addEventListener('resize', resize);
});


//TODO: - Fix the Canvas Resize Clear issue!
ctx.canvas.width = window.innerWidth;
function resize(){
    //ctx.canvas.width = window.innerWidth;
}

function getPosition(event){
    var rect  = ctx.canvas.getBoundingClientRect();
    my_coord.x=event.clientX - rect.left
    my_coord.y=event.clientY - rect.top
  }


function startPainting(event) {
    getPosition(event)
    event.preventDefault();
    event.stopPropagation();
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

function stopMobilePainting(event) {
    if(!solo){
        SendBrushUpdate(my_brush)
    }
}

function myStrokes(event) {
    event.preventDefault();
    event.stopPropagation();
    if(my_brush){
        drawMyStroke(my_brushThickness,'round',my_brushColor,event)
        if(!solo){
            SendMoves()
        }
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



function drawMyStroke(lW,lC,sS,event){
    ctx.beginPath();
    ctx.lineWidth = lW
    ctx.lineCap = lC;
    ctx.strokeStyle = sS;
    ctx.moveTo(my_coord.x, my_coord.y);
    getPosition(event);
    ctx.lineTo(my_coord.x , my_coord.y);
    ctx.stroke();
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


//Getting Peer Strokes and Brush Changes

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