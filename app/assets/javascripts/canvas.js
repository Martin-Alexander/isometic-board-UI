function newGame() {
  $.ajax({
    method: "POST",
    url: "/new",
    success: function(data) {
      // gameData = data;
      // setBoard(gameData);
      // setRandomGrassPattern();
      setBoard(data);
      setGame(data);
      run();
    }
  });
}

function clearCanvas() {
  canvasContext.save();
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.restore();
}

function run() {
  window.setInterval(function() {
    clearCanvas();
    board.render();
  }, 30);
}

$(document).ready(function() {
  intializeCanvas();
  initializeSourceImage();
  initializeMouseListener();
  newGame();
  // board.render();

  document.getElementById('canvas').onmousedown = function(){
    return false;
  };  
});

