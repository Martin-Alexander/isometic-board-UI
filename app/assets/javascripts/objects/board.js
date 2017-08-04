function Board(xSize, ySize) {

  this.data = [];

  this.render = function() {

  }

  this.square = function(x, y) {
    if (this.data[y]) {
      return this.data[y][x];
    }
  }
}