$(() =>{

  //---Animation for new block
  const $block = $('#block');
  const $stopButton = $('#stop');
  let intervalId;


  function animateBlock(){
    let direction = true;
    const windowWidth = $(window).width();
    const blockWidth = $block.width();
    intervalId = setInterval(function(){
      console.log('test')
      if(direction){
        if($block.position().left + blockWidth > windowWidth) direction = false;
        $block.css('left', '+=10px');
      }else{
        if($block.position().left < 0) direction = true;
        $block.css('left', '-=10px');
      }
    }, 20);
  }

  $stopButton.on('click', function(){
    clearInterval(intervalId);
  });


  function setup(){
    animateBlock();
  }
  setup();
});
