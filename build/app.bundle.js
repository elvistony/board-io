/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const P2PT = __webpack_require__(/*! p2pt */ "./node_modules/p2pt/p2pt.js")
const rs = __webpack_require__(/*! randomstring */ "./node_modules/randomstring/index.js")

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

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 10:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 11:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 12:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 13:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 14:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** ./common-node (ignored) ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 9:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });