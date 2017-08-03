var canvas, 
  canvasContext,
  canvasWidth, 
  canvasHeight,
  tileImage,
  unitImage,
  shieldImage,
  gameData,
  ySize,
  xSize;

var scale = 1.5;
var tileWidth = 56;
var tileHeight = 28;
var boardData = [];
var grassPattern = [];
var reinforcementPhase = false;
var ctrlDown = false;
var shiftDown = false;
var gameOver = false;
var my_key;

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
  this.inactive,
  this.type
}

function Piece(type, active) {
  this.type = type;
  this.active = active;
}
