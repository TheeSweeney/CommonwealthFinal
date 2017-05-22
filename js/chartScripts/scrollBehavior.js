$(document).ready(function(){


var heightHeader = $('header').height()
var heightHero = $('.hero-section').height()
var heightNav = $('.nav-holder').height()
var heightChap1 = $('#chapter1').height()
var heightChap2 = $('#chapter2').height()


var initial = true
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
    console.log((startPos), wS);
   if (wS > (startPos)){
    console.log('here')
    $('#exhibitThreeDiv').css({
      'position': 'fixed',
      'top': '76px',
      'right': '10px',
      'bottom': 'auto',
      'left': '418.8px'
    })
   }
   if (wS < (startPos)){
    console.log('rhere')
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