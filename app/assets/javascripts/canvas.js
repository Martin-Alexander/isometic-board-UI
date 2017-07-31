var canvas, 
  canvasContext,
  canvasWidth, 
  canvasHeight;

var tileWidth = 100;
var tileHeight = 50;

function intializeCanvas() {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");  

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvasContext.translate(canvas.width / 2, 50);
}

function drawTile(x, y, color) {
  context.save();
  context.translate(x, y);

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(tileWidth / 2, tileHeight / 2);
  context.lineTo(0, tileHeight);
  context.lineTo(-tileWidth / 2, tileHeight / 2);
  context.closePath();
  context.fillStyle = color;
  context.fill();

  context.restore();
}

window.onload(function() {
  intializeCanvas();
});
