function initializeSourceImage() {
  tileImage = document.getElementById("tiles");
  unitImage = document.getElementById("units");
  shieldImage = document.getElementById("shields");
  structureImage = document.getElementById("structures");
}


function intializeCanvas() {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");  

  canvasWidth = 1100;
  canvasHeight = 670;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvasContext.translate(canvas.width / 2, 50);
}

function setBoard(jsonGameData) {

  board.initializeAsEmpty();

  xSize = jsonGameData.board.meta_data.x_size
  ySize = jsonGameData.board.meta_data.y_size

  for (var y = 0; y < ySize; y++) {
    for (var x = 0; x < xSize; x++) {
      jsonSquare = jsonGameData.board.rows[y][x]
      newSquare = new Square();
      newSquare.x = jsonSquare.x;
      newSquare.y = jsonSquare.y;
      newSquare.player = jsonSquare.player;
      newSquare.structure = jsonSquare.structure;
      newSquare.pieces = [];
      newSquare.active = jsonSquare.active;
      newSquare.inactive = jsonSquare.inactive;

      for (var i = 0; i < jsonSquare.pieces.length; i++) {
        newPiece = new Piece(
          jsonSquare.pieces[0].type,
          jsonSquare.pieces[0].active
        )
        newSquare.pieces.push(newPiece);
      }
      board.square(x, y) = newSquare;
    }
  }
  run();
}

function randomSample(array) {
  return array[Math.floor(Math.random() * (array.length ))];
}

function chance(int) {
  if (Math.random() < 1 / int) {
    return true;
  } else {
    return false;
  }
}

function newGame() {
  $.ajax({
    method: "POST",
    url: "/new",
    success: function(data) {
      gameData = data;
      setBoard(gameData);
      setRandomGrassPattern();
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
    drawBoard();
  }, 30);
}

$(document).ready(function() {
  intializeCanvas();
  initializeSourceImage();
  initializeMouseListener();
  newGame();
  document.getElementById('canvas').onmousedown = function(){
    return false;
  };  
});

