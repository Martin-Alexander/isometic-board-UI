function Square() {

  this.board = board;

  this.x;
  this.y;
  this.player;
  this.units = [];
  this.structure = false;

  this.grass;

  this.numberOfUnits = this.units.length;
  this.active = numberOfPiecesThatAreActive();
  this.inactive = numberOfPiecesThatAreInavtive();

  // Renders the grass and farm of a square
  this.renderBottomLayer = function() {

  }

  // Render the city and units of a square
  this.renderTopLayer = function() {

  }
  
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