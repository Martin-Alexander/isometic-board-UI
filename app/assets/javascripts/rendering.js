function drawUnit(x, y, index, active, inactive) {
  canvasContext.save();

  canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
  canvasContext.drawImage(unitImage, index * tileWidth, 0, tileWidth, unitImage.height,
    -tileWidth / 2 + 3, -10, tileWidth - 8, unitImage.height - 8);
  drawInactiveShield(x, y, inactive);
  drawActiveShield(x, y, index % 2, active);
  canvasContext.restore();  
}

function drawActiveShield(x, y, index, active) {

  canvasContext.drawImage(shieldImage, index * 14, 0, 14, tileImage.height,
    -1, 4, 14, tileImage.height - 2);
  canvasContext.fillStyle = "white";
  canvasContext.font = "9px monospace";
  canvasContext.fillText(active, 0, 14);
}

function drawInactiveShield(x, y, inactive) {

  canvasContext.drawImage(shieldImage, 28, 0, 14, tileImage.height,
    4, -8, 14, tileImage.height - 2);
  canvasContext.fillStyle = "black";
  canvasContext.font = "9px monospace";
  canvasContext.fillText(inactive, 5, 2);
}

function drawBoard() {

  canvasContext.save();
  canvasContext.scale(scale, scale);

  for (var y = 0; y < ySize; y++) {
    for (var x = 0; x < xSize; x++) {
      board.square(x, y).renderBottomLayer();
    }
  }

  for (var y = 0; y < ySize; y++) {
    for (var x = 0; x < xSize; x++) {
      board.square(x, y).renderTopLayer();
    }
  }

  // hand.render();

  canvasContext.restore();
}