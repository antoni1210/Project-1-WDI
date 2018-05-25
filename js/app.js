$(() =>{


  // ------------------
  // Antoni's global variables
  // ------------------
  const $stopButton = $('#stop');
  let blockAnimationIntervalId;
  // let $block;
  let lastBlock;
  let $oldBlock;
  let initialBlockWidth = 400;
  const audio = document.querySelector('audio');

  // ------------------
  // Rob's global variables
  // ------------------
  let stackTopLeft, stackTopRight, $currentBlock,
    isFirstBlock, stackHeight, currentBlockWidth;
  let gameOver = false;

  const nextBlockGap = 25;
  const stackBlockGap = 2;
  // const audio = document.querySelector('audio');

  // ------------------
  // Rob's functions
  // ------------------

  // Start the game
  function startGame() {
    console.log('Starting game...');
    console.trace();
    stackTopLeft = null;
    stackTopRight = null;
    $currentBlock = null;
    isFirstBlock = true;
    stackHeight = $(window).height();
    currentBlockWidth = initialBlockWidth;
    createNewBlock();
  }

  document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
      case 32: // space
        dropBlock();
        break;
    }
  });

  function setTop(el, top) {
    el.css({ top: top });
  }

  function setLeft(el, left) {
    el.css({ left: left });
  }

  function getLeft(el) {
    return parseInt(el.css('left'));
  }

  function getRight(el) {
    return parseInt(getLeft(el) + getWidth(el));
  }

  function getWidth(el) {
    return parseInt(el.width());
  }

  function setWidth(el, width) {
    if (isFirstBlock) el.width(400);
    else el.width(width);
  }

  function createNewBlock(){
    $currentBlock = $('<div />');
    $currentBlock.css('background-color', getRandomColor())
    $currentBlock.addClass('current-block');
    $currentBlock.addClass('block');
    $('body').append($currentBlock);
    setTop($currentBlock, stackHeight - nextBlockGap);
    setLeft($currentBlock, 0);
    setWidth($currentBlock, stackTopRight - stackTopLeft);
    animateBlock();
  }

  function animateBlock(){
    let direction = 'right';
    const windowWidth = $(window).width();
    const blockWidth = $currentBlock.width();
    clearInterval(blockAnimationIntervalId);
    blockAnimationIntervalId = setInterval(function(){
      if(direction === 'right'){
        if($currentBlock.position().left + blockWidth > windowWidth) direction = 'left';
        $currentBlock.css('left', '+=10px');
      }else{
        if($currentBlock.position().left < 0) direction = 'right';
        $currentBlock.css('left', '-=10px');
      }
    }, 20);
  }

  function dropBlock() {
    clearInterval(blockAnimationIntervalId);
    setDroppedBlockTop();
    if(!isFirstBlock){
      const newWidth = setDroppedBlockWidth();
      if (newWidth <= 0) {
        endGame();
      }
    }
    stackTopLeft = getLeft($currentBlock);
    stackTopRight = getLeft($currentBlock) + getWidth($currentBlock);
    $currentBlock.removeClass('current-block');
    $currentBlock.addClass('stack-block');
    if(!gameOver) {
      createNewBlock();
    }
    isFirstBlock = false;
  }

  function setDroppedBlockTop() {
    const newHeight = stackHeight - $currentBlock.height() - stackBlockGap;
    setTop($currentBlock, newHeight);
    stackHeight = newHeight;
  }

  function setDroppedBlockWidth() {
    const currentLeft = getLeft($currentBlock);
    const currentRight = getRight($currentBlock);

    let newWidth = $currentBlock.width();
    let newLeft = currentLeft;

    if(getLeft($currentBlock)  < stackTopLeft) {
      //Overhanging on the left! Chop off the overhang
      newWidth -= (stackTopLeft - currentLeft);
      newLeft = stackTopLeft;
    } else if(currentRight > stackTopRight) {
      // Overhanging on the right!
      newWidth -= (currentRight - stackTopRight);
    }

    $currentBlock.width(newWidth);
    setLeft($currentBlock, newLeft);
    return newWidth;
  }

  function endGame() {
    clearInterval(blockAnimationIntervalId);
    alert('Game Over!');
    clearStack();
    gameOver = true;
  }

  function clearStack() {
    $('.block').remove();
  }


  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

  }

  $('#start').on('click', function(e) {
    $(e.target).blur();
    gameOver = false;
    audio.src = 'audio/corrupt_506.mp3';
    audio.play();
    startGame();

    var divs = document.getElementsByTagName('div');
    for(var i =0; i < divs.length; i++){
      divs[i].style.backgroundColor = getRandomColor();
    }


    getRandomColor();

  });

  // ------------------
  // Antoni's functions
  // ------------------
  // function getLatestBlock() {
  //   $block = $('.block');
  // }
  //
  // //Block animation
  // function animateBlock(){
  //   getLatestBlock();
  //   let direction = true;
  //   const windowWidth = $(window).width();
  //   const blockWidth = $block.width();
  //   lastBlock = $('.oldBlock').last();
  //   blockAnimationIntervalId = setInterval(function(){
  //     if(direction){
  //       if($block.position().left + blockWidth > windowWidth) direction = false;
  //       $block.css('left', '+=10px');
  //     }else{
  //       if($block.position().left < 0) direction = true;
  //       $block.css('left', '-=10px');
  //     }
  //   }, 20);
  // }
  //
  // //drop current block and introduce new block
  // $stopButton.on('click', function(){
  //   //stop current block animation (drops block)
  //   clearInterval(blockAnimationIntervalId);
  //
  //   $block.removeClass('block').addClass('oldBlock');
  //
  //   //get difference betweeen left edge of stack and left edge of block
  //   // to work out px to subtract from new block block width
  //   // const offsetLeft = Math.abs(lastBlock.offset().left - $block.offset().left);
  //
  //   const lastBlockLeftOffset = lastBlock.offset().left;
  //   const oldBlockLeftOffset = $('.oldBlock').last().offset().left;
  //   let widthChange;
  //
  //   console.log(lastBlock.width())
  //   if(lastBlockLeftOffset > oldBlockLeftOffset)
  //     widthChange = lastBlock.offset().left - $('.oldBlock').last().offset().left;
  //   else
  //     widthChange = $('.oldBlock').last().offset().left - lastBlock.offset().left;
  //   const newBlockWidth = lastBlock.width() - Math.abs(widthChange);
  //
  //   //New block
  //   const newBlock = document.createElement('div');
  //   $(newBlock).addClass('block').width(newBlockWidth).offset({top: $block.offset().top - 21});
  //
  //   $('body').append(newBlock);
  //
  //
  //   var divs = document.getElementsByTagName('div');
  //   for(var i =0; i < divs.length; i++){
  //     divs[i].style.background = getRandomColor();
  //   }
  //   function getRandomColor() {
  //     var letters = '0123456789ABCDEF'.split('');
  //     var color = '#';
  //     for (var i = 0; i < 6; i++ ) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     return color;
  //
  //   }
  //
  //   getRandomColor();
  //
  //   animateBlock();
  //
  // });
  //
  // animateBlock();
});


// last dropped block: height,
