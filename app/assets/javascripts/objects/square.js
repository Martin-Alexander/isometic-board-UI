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

  const shieldLookup = {
    "1": 1,
    "2": 0
  }

  // Renders the grass and farm of a square
  this.renderBottomLayer = function() {
    
    canvasContext.save();
    canvasContext.translate((this.y - this.x) * tileWidth / 2, (this.x + this.y) * tileHeight / 2);

    canvasContext.drawImage(
      tileImage, this.grass * 60, 0, tileWidth, 40,
                  -tileWidth / 2, 0, tileWidth, 40
    );

    if (this.structure == "farm") { 
      canvasContext.drawImage(
        structureImage, structureLookup[this.player.toString()][this.structure] * 56, 0, tileWidth, 40,
                        -tileWidth / 2, 0, tileWidth, 40
      );    
    }

    canvasContext.restore();
  }

  // Render the city and units of a square
  this.renderTopLayer = function() {
    canvasContext.save();
    canvasContext.translate((this.y - this.x) * tileWidth / 2, (this.x + this.y) * tileHeight / 2);

    if (this.structure == "city") {
      canvasContext.drawImage(
        structureImage, structureLookup[this.player.toString()][this.structure] * 56, 0, tileWidth, 40,
                        -tileWidth / 2, 0, tileWidth, 40
      );        
    }

    if (this.units.length > 0) {
      canvasContext.drawImage(
        unitImage, unitLookup[this.player.toString()]["soldier"] * tileWidth, 0, tileWidth, unitImage.height,
                    -tileWidth / 2 + 3, -10, tileWidth - 8, unitImage.height - 8
      );

      canvasContext.drawImage(shieldImage, 28, 0, 14, tileImage.height,
                                          4, -8, 14, tileImage.height - 2);
      canvasContext.fillStyle = "black";
      canvasContext.font = "9px monospace";
      canvasContext.fillText(10, 5, 2);


      canvasContext.drawImage(shieldImage, shieldLookup[this.player.toString()] * 14, 0, 14, tileImage.height,
                                          -1, 4, 14, tileImage.height - 2);
      canvasContext.fillStyle = "white";
      canvasContext.font = "9px monospace";
      canvasContext.fillText(10, 0, 14);
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
}