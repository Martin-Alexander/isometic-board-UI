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

  canvasContext.save();
  canvasContext.scale(scale, scale);

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      if (tile.structure == "farm") {
        drawTile(tile.x, tile.y, 5);
      } else if (grassPattern[i][j] == 1) {
        drawTile(tile.x, tile.y, 7);
      } else {
        drawTile(tile.x, tile.y, 5);
      }
    }
  }

  for (var i = 0; i < boardY; i++) {
    for (var j = 0; j < boardX; j++) {
      var tile = boardData[i][j];
      if (tile.structure == "farm") {
        if (tile.player.id == 1) {
          drawStructure(i, j, 0);
        } else {
          drawStructure(i, j, 1);
        }
      }
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
        if (reinforcementPhase) {
          canvasContext.fillStyle = "rgba(255, 0, 0, 0.8)";  
        } else {
          canvasContext.fillStyle = "rgba(255, 255, 255, 0.8)";
        }
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

function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}


function setRandomGrassPattern() {
  for (var i = 0; i < ySize; i++) {
    grassPattern.push([]);
    for (var j = 0; j < xSize; j++) {
      grassPattern[grassPattern.length - 1].push(Math.floor(Math.random() * 2));
    }
  }
}