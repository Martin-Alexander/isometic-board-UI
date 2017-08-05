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
}