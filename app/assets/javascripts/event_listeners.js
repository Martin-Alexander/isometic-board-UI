function initializeMouseListener() {
  canvas.addEventListener("mousemove", function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseCoordinates = {
      x: event.clientX - rect.left - canvasWidth / 2,
      y: event.clientY - rect.top - 50
    };
    var isoCoords = {
      x: (mouseCoordinates.x + 2 * mouseCoordinates.y) / 2,
      y: (2 * mouseCoordinates.y - mouseCoordinates.x) / 2
    }
    tileOver = {
      x: Math.floor((isoCoords.x / scale) / tileHeight),
      y: Math.floor((isoCoords.y / scale) / tileHeight)
    }
    // console.log(tileOver.x + ", " + tileOver.y);
  });

  canvas.addEventListener("mouseup", function(event) {
    if (!sourceTile) {
      sourceTile = { x: tileOver.x, y: tileOver.y };
    } else if (sourceTile.x == tileOver.x && sourceTile.y == tileOver.y) {
      sourceTile = false;
      targetTile = false;
    } else {
      targetTile = { x: tileOver.x, y: tileOver.y };
      $.ajax({
        method: "POST",
        url: "/input",
        data: {
          from: sourceTile,
          to: targetTile,
          game_data: JSON.stringify(gameData)
        },
        success: function() {
          console.log(
            "From: " + 
            sourceTile.x + ", " + sourceTile.y +
            " To: " +
            targetTile.x + ", " + targetTile.y
          );
          sourceTile = false;
          targetTile = false;
        }
      });
    }
  });
}