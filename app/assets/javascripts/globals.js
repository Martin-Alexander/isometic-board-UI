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

function Unit(type, active) {

  this.type = type;
  this.active = active;
}

function Square(x, y, player) {

  this.x = x;
  this.y = y;
  this.player = player;
  this.units = [];
  this.structure = false;
  this.numberOfUnits = this.units.length;
  this.active = numberOfPiecesThatAreActive();
  this.inactive = numberOfPiecesThatAreInavtive();
  
  // For a give unit type and activation status returns the number of such units in the square
  this.numberOf = function(typeOfUnitFilter, activeStatusFilter = false) {

    var counter = 0;
    for (var i = 0; i < this.numberOfUnits; i++) {
      if (this.units[i].type == typeOfUnitFilter) {
        if (activeStatusFilter) {
          if (this.units[i].active == activeStatusFilter) {
            counter++;
          }
        } else {
          counter++;
        }
      }
    }

    return counter;
  }

  // Returns the number of units in this square that are active
  function numberOfUnitsThatAreActive() {

    var counter = 0;
    for (var i = 0; i < this.numberOfUnits; i++) {
      if (this.pieces[i].active) { counter++; }
    }

    return counter;
  }

  // Returns the number of units in this square that are inactive
  function numberOfUnitsThatAreInavtive() {

    var counter = 0;
    for (var i = 0; i < this.numberOfUnits; i++) {
      if (!(this.pieces[i].active)) { counter++; }
    }

    return counter;
  }
}