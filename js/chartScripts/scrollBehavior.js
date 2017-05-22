$(document).ready(function(){


var heightHeader = $('header').height()
var heightHero = $('.hero-section').height()
var heightNav = $('.nav-holder').height()
var heightChap1 = $('#chapter1').height()
var heightChap2 = $('#chapter2').height()
var heightChap3 = $('#chapter3').height()


var initial = true;
var startPos;

$(window).scroll(function() {
   var hT = $('#exhibitThreeDiv').offset().top,
       hH = $('#exhibitThreeDiv').outerHeight(),
       wH = $(window).height(),
       wS = $(this).scrollTop();
  if(initial){
    startPos = hT+hH-heightHeader - heightNav - 425
    initial = false;
  }
    console.log((startPos + heightChap3 - hH), wS);
   if (wS > (startPos)){
    $('#exhibitThreeDiv').css({
      'position': 'fixed',
      'top': '76px',
      'right': '10px',
      'bottom': 'auto',
      'left': '418.8px'
    })
   }
   if (wS > (startPos + heightChap3 - hH - 60) ){//scroll down
    $('#exhibitThreeDiv').css({
      'position': 'absolute',
      'top': 'auto',
      'right': '0px',
      'bottom': '0px',
      'left': '40%',
      'max-height': 'none'
    })
   }
   if (wS < (startPos)){//scroll up
    $('#exhibitThreeDiv').css({
      'position': 'absolute',
      'top': '',
      'right': '',
      'bottom': '',
      'left': ''
    })
   }
});


})
//4244.25 3844