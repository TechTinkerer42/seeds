$(function(){

    $('<div id="component-to-top">TOP</div>')
      .appendTo('body')
      .on('click', function(){
        $('html,body').animate({
          scrollTop: 0
        });
    });

});
