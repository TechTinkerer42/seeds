//@import components/to-top.js;

$(function(){

    var icons = $('#icons .sprite-icon'),
      sections = $('#details section');
    icons.each(function(index, elem){
      $(elem).on('click', function(){
        icons.removeClass('active');
        $(elem).addClass('active');
        sections.removeClass('active');
        $(sections[index]).addClass('active');
      });
    });
});
