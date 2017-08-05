function Square() {

  this.x;
  this.y;

  this.player;
  this.structure = false;
  this.units = [];

  this.grass;
  
  const unitLookup = {
    "1": {
      "soldier": 1,
      "worker": 3,
      "scout": null
    },
    "2": {
      "soldier": 0,
      "worker": 2,
      "scout": null
    }
  }

  const structureLookup = {
    "1": {
      "farm": 0,
      "city": 3
    },
    "2": {
      "farm": 1,
      "city": 2
    }    
  }

  // Renders the grass and farm of a square
  this.renderBottomLayer = function() {
    
    canvasContext.save();
    canvasContext.translate((this.x - this.y) * tileWidth / 2, (this.x + this.y) * tileHeight / 2);

    canvasContext.drawImage(
      // Source
      tileImage, 
      // x, y, width, height
      this.grass * 60, 0, tileWidth, 40,
      // x, y, width, height
      -tileWidth / 2, 0, tileWidth, 40
    );

    if (this.structure == "farm" && this.player) { 
      canvasContext.drawImage(
        // Source
        structureImage,
        // x, y, width, height
        structureLookup[this.player.toString()][this.structure] * 56, 0, tileWidth, 40,
        // x, y, width, height
        -tileWidth / 2, 0, tileWidth, 40
      );    
    }

    canvasContext.restore();
  }

  // Render the city and units of a square
  this.renderTopLayer = function() {
    canvasContext.save();
    canvasContext.translate((this.x - this.y) * tileWidth / 2, (this.x + this.y) * tileHeight / 2);

    if (this.units.length > 0) {
      canvasContext.drawImage(
        // Source
        unitImage, 
        // x, y, width, height
        unitLookup[this.player.toString()]["soldier"] * 60, 0, tileWidth, 40,
        // x, y, width, height
        -tileWidth / 2, 0, tileWidth, 40
      );
    }

    canvasContext.restore();
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

  function renderTile() {

  }

  function renderStructure() {

  }
}