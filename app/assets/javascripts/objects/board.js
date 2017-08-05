function Board(xSize, ySize) {

  this.data = [];

  this.render = function() {

  }

  this.square = function(x, y) {

    return this.data[y * ySize + x];
  }

  this.empty = function() {

    this.data = [];
    for (var i = 0; i < ySize * xSize; i++) {
      this.data.push(new Square);
    }
  }

  this.render = function() {

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

    hand.render();

    canvasContext.restore();
  }
}