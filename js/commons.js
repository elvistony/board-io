$(".color-option").each(function() {
  $(this).children().eq(1).css("background-color", $(this).children().eq(0).val());
});

var colors = Array.prototype.slice.call( document.getElementsByClassName('pallette-color') )
colors.forEach(element => {
  element.style.background = element.title;
});

// FullScreen Maker
var FullScreen = false;
function toggleFullscreen() {
	if(!FullScreen){
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullscreen) { /* Safari */
      document.body.webkitRequestFullscreen();
    } else if (document.body.msRequestFullscreen) { /* IE11 */
      document.body.msRequestFullscreen();
    }
    FullScreen=true;
  }else{
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    FullScreen=false;
  }
}

//Sidebar
$(function() {
  $('.btn-main').on('click', function() {
    $('.btn-group-fab').toggleClass('active');
  });
  $('has-tooltip').tooltip();
});

function RandomCoder(){
  randomvalue = "boardio";
  // var img = new Image()
  // code = encodeURIComponent("https://elvistony.github.io/board-io/#"+randomvalue);
  // img.src = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data="+code;
  // img.classList.add("img")
  // img.classList.add("m-3")
  // img.classList.add("rounded")
  // img.onload = function (){
  //   document.getElementById('qrcode').appendChild(img)
  // }
  return randomvalue ;

}


document.getElementById("btn-choose-join").addEventListener('click',()=>{ShareModal(1)});
document.getElementById("btn-choose-create").addEventListener('click',()=>{ShareModal(2)});
document.getElementById("share-modal-back").addEventListener('click',()=>{ShareModal(0)});

//default Slide
show = "card-choose-share"
function ShareModal(mode){
  options = ["card-choose-share","card-choose-join","card-choose-create"]
  document.getElementById(show).style.display="none";
  document.getElementById(options[mode]).style.display="block";
  show=options[mode];
}

function RandomColor(){
  var colors = ["#1d809f","#16A085","#7D3C98","#E74C3C","#F39C12","#D35400","#D4AC0D","#D0D3D4","#17A589","#D81B60"];
  var rand = Math.floor(Math.random() * 10);
  return colors[rand];
}

function SendCode(){
  var code = document.getElementsByName("join-room-code")[1];
  window.open("whatsapp://send?text=Join Me on Board-IO - https://elvistony.github.io/board-io/#"+code.value)
}

window.onload = () =>{
  if(location.hash.length>1){
    $('#shareModal').modal('show');
    ShareModal(1);
    document.getElementsByName("join-room-code")[0].value = location.hash.substring(1);
  }
}
