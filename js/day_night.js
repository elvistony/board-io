
  function changeOrientation(ele){
    if (ele.innerText=="Side-by-Side"){
      ele.innerText="Above-n-Below"
    }else{
      ele.innerText="Side-by-Side"
    }
    document.getElementById('slideDiv').classList.toggle('w3-half')
    document.getElementById('propDiv').classList.toggle('w3-half')
  }

function DarkMode(){
  document.getElementById('footer').classList.toggle('darkBar');
  document.getElementById('htmldata').classList.toggle('darkInput');
  document.getElementById('output').classList.toggle('darkOutput');
  document.body.classList.toggle('dark');
}

window.onbeforeunload = function(event) {
    event.returnValue = "Your current file will be Lost on Reload, Continue?";
};

var elem = document.documentElement;

function openFullscreen(ele) {
  ele.setAttribute('onclick','closeFullscreen(this);');
  ele.classList.toggle('w3-orange')
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen(ele) {
  ele.setAttribute('onclick','openFullscreen(this);');
  ele.classList.toggle('w3-orange')
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
