var canvas, 
  canvasContext,
  tileImage,
  unitImage,
  shieldImage,
  ySize,
  xSize;

var scale = 1.5;
const tileWidth = 56;
const tileHeight = 28;
var grassPattern = [];
var my_key;

var board = new Board(12, 12);
var game = new Game;

