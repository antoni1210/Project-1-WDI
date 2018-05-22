$(() =>{

  //Animation for starting block
  const $stopButton = $('#stop');
  let intervalId;
  let $block;
  let lastBlock;

  function getLatestBlock() {
    $block = $('.block');
  }
  //continuous block animation from left to right of screen
  function animateBlock(){
    getLatestBlock();
    let direction = true;
    const windowWidth = $(window).width();
    const blockWidth = $block.width();
    lastBlock = $('.oldBlock').last();
    intervalId = setInterval(function(){
      console.log('test');
      if(direction){
        if($block.position().left + blockWidth > windowWidth) direction = false;
        $block.css('left', '+=10px');
      }else{
        if($block.position().left < 0) direction = true;
        $block.css('left', '-=10px');
      }
    }, 40);
  }

  //drop current block and introduce new block
  $stopButton.on('click', function(){
    //stop current block animation (drops block)
    clearInterval(intervalId);
    $block.removeClass('block').addClass('oldBlock');
    //get difference betweeen left edge of stack and left edge of block
    // to work out px to subtract from new block block width
    const widthChange = Math.abs(lastBlock.offset().left - $('.oldBlock').last().offset().left);
    console.log(widthChange, lastBlock.width());
    // newBlock width = newBlock width - overlap px


    //newBlock();
    const newBlock = document.createElement('div');
    $(newBlock).addClass('block').width(lastBlock.width() - widthChange).offset({top: lastBlock.offset().top - 21});

    $('body').append(newBlock);
    // console.log($(newBlock).width());
    animateBlock();
  });

  animateBlock();
});


//function newBlock(width) creates a new block with the class of current-block
// function newBlock(width){
//   let direction = true;
//   const windowWidth = $(window).width();
//   const blockWidth = $block.width();
//   intervalId = setInterval(function(){
//     console.log('test');
//     if(direction){
//       if($block.position().left + blockWidth > windowWidth) direction = false;
//       $block.css('left', '+=10px');
//     }else{
//       if($block.position().left < 0) direction = true;
//       $block.css('left', '-=10px');
//     }
//   }, 20);
//
//
// }
