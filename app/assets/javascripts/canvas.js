var canvas, 
  canvasContext,
  canvasWidth, 
  canvasHeight,
  tileImage,
  unitImage,
  shieldImage;

var scale = 1.2;
var tileWidth = 56;
var tileHeight = 28;
var boardData = [];

var boardX = 15;
var boardY = 15;

var sourceTile = false;
var targetTile = false;
var tileOver;

function Tile(grass, unit, structure) {
  this.grass = grass;
  this.unit = unit;
  this.structure = structure;
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
  drawInactiveShield(x, y, active);
  drawActiveShield(x, y, index % 2, inactive);
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
  canvasContext.save()
  canvasContext.scale(scale, scale);

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      drawTile(i, j, tile.grass);
    }
  }

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      if (tile.structure != 0) {
        drawStructure(i, j, tile.structure - 1);
      }
    }
  }

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      if (tile.structure > 2) {
        drawStructure(i, j, tile.structure - 1);
      }
    }
  }

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      if (tile.unit != 0) {
        drawUnit(i, j, tile.unit - 1, Math.floor(Math.random() * 99), Math.floor(Math.random() * 99))
      }
      if (sourceTile.x == j && sourceTile.y == i) {
        canvasContext.save();
        canvasContext.translate((j - i) * tileWidth / 2, (j + i) * tileHeight / 2);
        canvasContext.beginPath();
        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(tileWidth / 2, tileHeight / 2);
        canvasContext.lineTo(0, tileHeight);
        canvasContext.lineTo(-tileWidth / 2, tileHeight / 2);
        canvasContext.closePath();
        canvasContext.fillStyle = "rgba(255, 255, 255, 0.8)";
        canvasContext.fill();
        canvasContext.restore();        
      }
      if (tileOver && tileOver.x == j && tileOver.y == i) {
        canvasContext.save();
        canvasContext.translate((j - i) * tileWidth / 2, (j + i) * tileHeight / 2);
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
    }
  }

  canvasContext.restore();
}

function setBoard() {
  for (var i = 0; i < boardY; i++) {
    boardData.push([]);
    for (var j = 0; j < boardX; j++) {
      var grass = randomSample([5, 6]);
      var unit = randomSample([0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 1, 2]);
      var structure = randomSample([0, 0, 0,0, 0, 0, 1, 2, 3, 4]);
      boardData[boardData.length - 1].push(new Tile(grass, unit, structure));
    }
  }
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
  setBoard();
  initializeSourceImage();
  initializeMouseListener();
  run();
});

