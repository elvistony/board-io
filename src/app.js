const P2PT = require('p2pt')
const randomBytes = require('randombytes')
const rs = require('randomstring')
var You = false;
var joined= false;

var room= document.getElementById('room');
var username= document.getElementById('nick');
var msg= document.getElementById('msg');
var hostDiv = document.getElementById('Hostee')
var jointDiv = document.getElementById('Joinee')

var members= {};
var feed= [];
var peers = {};
var p2pt=false;

document.getElementById('genMeet').addEventListener('click', NewRoom);
document.getElementById('join').addEventListener('click',joinChat);
document.getElementById('send').addEventListener('click',sendMessage);
document.getElementById('vidON').addEventListener('click',AddVideo);


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

// Primary Functions
function NewRoom() {
    //Generate Meeting ID 
    room.value=rs.generate(9)
    //var hostSecret = CreateKey()
}

//----------------------------------------------

//Loading The URL Hash
var hashcode = window.location.hash
if(hashcode.length<=1){
    dlog("General Mode - Showing both Options")
    //General Mode - No hash - showing Both options
    hostDiv.style.display='block'
    jointDiv.style.display='block'
}else if(hashcode.substring(1,5)=="host"){
    var pre_session_id = getCookie('active_room_id')
    if(pre_session_id!=""){
    dlog("Host Mode - Prev Session present")
    // Host mode with Prev Session
    //send the sorry-ticket and generate a new one and send to peers
    //Check Cookies
    }else{
    dlog("Host Mode - Showing New Room Form")
    // Host mode - New Session
    hostDiv.style.display='block'
    //Show New Meet Creation Form
    }
}else{
    // Join Mode
    dlog("Peer Mode - Showing Peer form")
    jointDiv.style.display='block'
    room.value = hashcode.substring(1,hashcode.length)
}


function joinChat () {
    var uname = username.value
    var rcode = room.value
    if (rcode.trim() === '' || uname.trim() === '') {
    alert('enter Nickname')
    return
    }
    init()
    joined = true
    status = uname+` joined the chat`
    usernames = {}
    listen()
}


function AddVideo(){
    console.log("adding stream -->to lib");
    p2pt.addPStream(YourStream);
}



function sendMessage(){
    var newmsg = msg.value;
    const message = {
    username: username.value,
    message: newmsg
    }
    for (var key in peers) {
    send2Peer(peers[key],message)
    }
    feed.push(message)
}


//-----------------------------------------------------------
//Announce 
function init () {
    let announceURLs = [
    "wss://tracker.sloppyta.co:443/announce",
    "wss://tracker.novage.com.ua:443/announce",
    "wss://tracker.btorrent.xyz:443/announce",
    ]
    p2pt = new P2PT(announceURLs, 'kollab' + this.room)
}

//SendtoPeer
function send2Peer (peer,message) {
    console.log(message);
    p2pt.send(peer, JSON.stringify(message))
}

//Getting Feed
function listen () {
    p2pt.on('peerconnect', (peer) => {
    peers[peer.id] = peer;
    console.log(peer);

    peer.on('peerstream',(stream)=>{
        var video = document.createElement('video')
        document.body.appendChild(video)
        console.log(stream);
        video.srcObject = stream;
        video.play()
    },function(err){
    console.log(err);
    })

    })
    p2pt.on('peerclose', (peer) => {
    delete peers[peer.id]
    delete members[peer.id]
    })
    p2pt.on('msg', (peer, msg) => {
    msg = JSON.parse(msg)
    console.log(msg);
    members[peer.id] = msg.username
    feed.push({
        username: msg.username,
        message: msg.message
    })
    })

    p2pt.on('peerstream',(stream)=>{
    var video = document.createElement('video')
    document.body.appendChild(video)
    console.log('getting stream');
    video.srcObject = stream
    })

    p2pt.on('hello',(msg)=>{
    console.log(msg)
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