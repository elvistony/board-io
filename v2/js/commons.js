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
