var canvas, 
  canvasContext,
  canvasWidth, 
  canvasHeight,
  tileImage,
  unitImage,
  shieldImage;

var scale = 2;
var tileWidth = 56;
var tileHeight = 28;
var boardData = [];

var sourceTile = false;
var targetTile = false;
var tileOver;

function Square() {
  this.x;
  this.y;
  this.player;
  this.pieces;
  this.structure;
  this.active,
  this.inactive
}

function Piece(type, active) {
  this.type = type;
  this.active = active;
}

function initializeMouseListener() {
  canvas.addEventListener("mousemove", function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseCoordinates = {
      x: event.clientX - rect.left - canvasWidth / 2,
      y: event.clientY - rect.top - 50
    };
    var isoCoords = {
      x: (mouseCoordinates.x + 2 * mouseCoordinates.y) / 2,
      y: (2 * mouseCoordinates.y - mouseCoordinates.x) / 2
    }
    tileOver = {
      x: Math.floor((isoCoords.x / scale) / tileHeight),
      y: Math.floor((isoCoords.y / scale) / tileHeight)
    }
  });

  canvas.addEventListener("mouseup", function(event) {
    if (!sourceTile) {
      sourceTile = { x: tileOver.x, y: tileOver.y };
    } else if (sourceTile.x == tileOver.x && sourceTile.y == tileOver.y) {
      sourceTile = false;
      targetTile = false;
    } else {
      targetTile = { x: tileOver.x, y: tileOver.y };
      console.log(
        "From: " + 
        sourceTile.x + ", " + sourceTile.y +
        " To: " +
        targetTile.x + ", " + targetTile.y
      );

      sourceTile = false;
      targetTile = false;
    }
  });
}

function initializeSourceImage() {
  tileImage = document.getElementById("tiles");
  unitImage = document.getElementById("units");
  shieldImage = document.getElementById("shields");
  structureImage = document.getElementById("structures");
}


function intializeCanvas() {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");  

  canvasWidth = window.innerWidth - 4;
  canvasHeight = window.innerHeight - 4;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvasContext.translate(canvas.width / 2, 50);
}

function drawTile(x, y, index) {
  canvasContext.save();

  canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
  canvasContext.drawImage(
    tileImage, 
    index * 60, 0, tileWidth, 40,
    -tileWidth / 2, 0, tileWidth, 40
  );

  canvasContext.restore();
}

function drawUnit(x, y, index, active, inactive) {
  canvasContext.save();

  canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
  canvasContext.drawImage(unitImage, index * tileWidth, 0, tileWidth, unitImage.height,
    -tileWidth / 2, -35 / 2, tileWidth, unitImage.height);
  drawInactiveShield(x, y, inactive);
  drawActiveShield(x, y, index % 2, active);
  canvasContext.restore();  
}

function drawActiveShield(x, y, index, active) {
  canvasContext.drawImage(shieldImage, index * 14, 0, 14, tileImage.height,
    3, -2, 14, tileImage.height);
  canvasContext.fillStyle = "white";
  canvasContext.font = "9px monospace";
  canvasContext.fillText(active, 5, 7);
}

function drawInactiveShield(x, y, inactive) {

  canvasContext.drawImage(shieldImage, 28, 0, 14, tileImage.height,
    8, -12, 14, tileImage.height);
  canvasContext.fillStyle = "black";
  canvasContext.font = "9px monospace";
  canvasContext.fillText(inactive, 10, -3);
}

function drawStructure(x, y, type) {
  canvasContext.save();
  canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
  canvasContext.drawImage(
    structureImage, 
    type * 56, 0, tileWidth, 40,
    -tileWidth / 2, 0, tileWidth, 40
  );
  canvasContext.restore();
}

function drawBoard() {

  var boardX = gameData.board.meta_data.x_size;
  var boardY = gameData.board.meta_data.y_size;

  canvasContext.save()
  canvasContext.scale(scale, scale);

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      drawTile(tile.x, tile.y, 5);
    }
  }

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      if (tile.structure == "city") {
        if (tile.player.id == 1) {
          drawStructure(i, j, 3);
        } else {
          drawStructure(i, j, 2);
        }
      }
    }
  }

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      if (sourceTile.x == i && sourceTile.y == j) {
        canvasContext.save();
        canvasContext.translate((i - j) * tileWidth / 2, (j + i) * tileHeight / 2);
        canvasContext.beginPath();
        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(tileWidth / 2, tileHeight / 2);
        canvasContext.lineTo(0, tileHeight);
        canvasContext.lineTo(-tileWidth / 2, tileHeight / 2);
        canvasContext.closePath();
        canvasContext.fillStyle = "rgba(255, 255, 255, 0.8)";
        canvasContext.fill();
        canvasContext.restore();        
      } else if (tileOver && tileOver.x == i && tileOver.y == j) {
        canvasContext.save();
        canvasContext.translate((i - j) * tileWidth / 2, (j + i) * tileHeight / 2);
        canvasContext.beginPath();
        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(tileWidth / 2, tileHeight / 2);
        canvasContext.lineTo(0, tileHeight);
        canvasContext.lineTo(-tileWidth / 2, tileHeight / 2);
        canvasContext.closePath();
        canvasContext.fillStyle = "rgba(255, 255, 255, 0.2)";
        canvasContext.fill();
        canvasContext.restore();        
      }
      if (tile.pieces.length != 0) {
        if (tile.player.id == 1) {
          if (tile.pieces[0].type == "soldier") {
            drawUnit(i, j, 1, tile.active, tile.inactive)
          } else {
            drawUnit(i, j, 3, tile.active, tile.inactive)
          }
        } else {
          if (tile.pieces[0].type == "soldier") {
            drawUnit(i, j, 0, tile.active, tile.inactive)
          } else {
            drawUnit(i, j, 2, tile.active, tile.inactive)
          }          
        }
      }
    }
  }

  canvasContext.restore();
}

function setBoard(jsonGameData) {
  var xSize = jsonGameData.board.meta_data.x_size
  var ySize = jsonGameData.board.meta_data.y_size

  for (var y = 0; y < ySize; y++) {
    boardData.push([]);
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
      boardData[boardData.length - 1].push(newSquare);
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

var gameData;

function newGame() {
  $.ajax({
    method: "POST",
    url: "/new",
    success: function(data) {
      console.log(data);
      gameData = data;
      setBoard(data);
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
});

