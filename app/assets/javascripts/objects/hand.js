var hand = {

  mousePosition: undefined,
  mouseIsoPosition: undefined,
  tileOver: undefined,
  ctrlDown: false,
  shiftDown: false,
  
  selectedTile: false,

  hoverTile: undefined,
  clickedTile: undefined,
  cityBox: false,
  unitBox: false,

  click: function() {

    // if (this.cityBox || this.unitBox) {

    // } else {

      this.clickedTile = board.square(this.tileOver.x, this.tileOver.y);      

      if (this.clickedTile.units.length > 0 && this.selectedTile == false) {
        this.selectedTile = this.clickedTile;
        this.unitBox = true;
      } else if (this.selectedTile) {
        this.unitBox = false;
        this.selectedTile = false;
      } else {
      }
    // }
  },

  render: function() {
    if (this.selectedTile) {
      canvasContext.save();
      canvasContext.translate((this.selectedTile.x - this.selectedTile.y) * tileWidth / 2, (this.selectedTile.y + this.selectedTile.x) * tileHeight / 2);
      canvasContext.beginPath();
      canvasContext.moveTo(0, 0);
      canvasContext.lineTo(tileWidth / 2, tileHeight / 2);
      canvasContext.lineTo(0, tileHeight);
      canvasContext.lineTo(-tileWidth / 2, tileHeight / 2);
      canvasContext.closePath();
      canvasContext.fillStyle = "rgba(255, 255, 255, 0.8)";
      canvasContext.fill();
      canvasContext.restore(); 

      canvasContext.save();
      canvasContext.translate((this.tileOver.x - this.tileOver.y) * tileWidth / 2, (this.tileOver.y + this.tileOver.x) * tileHeight / 2);
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
    if (this.unitBox) {
      this.openUnitBox();
    }
  },

  closeBox: function() {
    console.log("Close Box");
  },

  openCityBox: function() {
    console.log("Open City Box");
  },

  openUnitBox: function() {
    canvasContext.save();
    canvasContext.translate((this.selectedTile.x - this.selectedTile.y) * tileWidth / 2, (this.selectedTile.y + this.selectedTile.x) * tileHeight / 2);
    canvasContext.beginPath();
    canvasContext.moveTo(-40, -80);
    canvasContext.lineTo(40, -80);
    canvasContext.lineTo(40, -5);
    canvasContext.lineTo(-40, -5);
    canvasContext.closePath();
    canvasContext.fillStyle = "grey";
    canvasContext.fill();
    canvasContext.restore();
  }
}