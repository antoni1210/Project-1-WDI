$(() =>{

  //---Animation for new block
  const $block = $('#block');

  function animateBlock(){
    let direction = true; // true goes right, flase goes left
    const windowWidth = $(window).width();
    const blockWidth = $block.width();
    setInterval(function(){
      if(direction){
        if($block.position().left + blockWidth > windowWidth) direction = false;
        $block.css('left', '+=10px');
      }else{
        if($block.position().left < 0) direction = true;
        $block.css('left', '-=10px');
      }
    }, 20);
  }

  function setup(){
    animateBlock();
  }
  setup();
});
