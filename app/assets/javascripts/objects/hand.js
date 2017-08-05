function Hand() {

  this.mousePosition = { x: null, y: null };
  this.mouseIsoPosition = { x: null, y: null };
  this.tileOver = { x: null, y: null };
  this.ctrlDown = false;
  this.shiftDown = false;
  
  this.selectedTile = false;

  var hoverTile;
  var clickedTile;
  var cityBox = false;
  var unitBox = false;

  this.click = function() {

    if (cityBox || unitBox) {

    } else {
      clickedTile = board.square(this.tileOver.x, this.tileOver.y);
      var muh = {};
      muh.x = this.selectedTile.x;
      muh.y = this.selectedTile.y;
      var muh2 = JSON.stringify(game.data);
      

      if (clickedTile.units.length > 0 && this.selectedTile == false) {
        this.selectedTile = clickedTile;
      } else if (this.selectedTile) {
        $.ajax({
          method: "POST",
          url: "/move",
          data: {
            from: muh,
            to: clickedTile,
            amount: "one",
            game_data: muh2
          }
        });
        // sendToServer({
        //   action: "move",
        //   data: {
        //     from: this.selectedTile,
        //     to: clickedTile,
        //     amount: "all",
        //     game_data: game
        //   }
        // });
        this.selectedTile = false;
      } else {
      }
    }
  }

  this.render = function() {
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

      // if (
      //   this.tileOver.x < this.selectedTile.x + 2 &&
      //   this.tileOver.x > this.selectedTile.x - 2 &&
      //   this.tileOver.y < this.selectedTile.y + 2 &&
      //   this.tileOver.y > this.selectedTile.y - 2
      // ) {
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
      // }
    }
  }

  function closeBox() {
    console.log("Close Box");
  }

  function openCityBox() {
    console.log("Open City Box");
  }

  function openUnitBox() {
    console.log("Open Unit Box");
  }
}