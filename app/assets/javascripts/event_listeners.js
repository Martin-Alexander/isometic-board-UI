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
    if (reinforcementPhase) {
      sourceTile = { x: tileOver.x, y: tileOver.y }
    } else {
      if (!sourceTile) {
        sourceTile = { x: tileOver.x, y: tileOver.y };
      } else if (sourceTile.x == tileOver.x && sourceTile.y == tileOver.y) {
        sourceTile = false;
        targetTile = false;
      } else {
        if (ctrlDown) {
          var amountSelected = "half"
        } else if (shiftDown) {
          var amountSelected = "all"
        }
        targetTile = { x: tileOver.x, y: tileOver.y };
        $.ajax({
          method: "POST",
          url: "/move",
          data: {
            from: sourceTile,
            to: targetTile,
            game_data: JSON.stringify(gameData),
            amount: amountSelected
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
    }
  });
  window.addEventListener("keyup", function(event) {
    if ((event.keyCode == 87 || event.keyCode == 83) && reinforcementPhase) {
      if (event.keyCode == 83) {
        var typeSelected = "soldier";
      } else {
        var typeSelected = "worker";
      }
      $.ajax({
        method: "POST",
        url: "/reinforcement",
        data: {
          location: sourceTile,
          type: typeSelected,
          game_data: JSON.stringify(gameData)
        }
      });
    } else if (event.keyCode == 82) {
      reinforcementPhase = !reinforcementPhase;
      if (!reinforcementPhase) {
        sourceTile = false;
      }
    } else if (event.keyCode == 78) {
      nextTurn();      
    } else if ((event.keyCode == 66 || event.keyCode == 70) && !reinforcementPhase) {
      if (event.keyCode == 66) {
        var typeSelected = "city";
      } else {
        var typeSelected = "farm";
      }
      $.ajax({
        method: "POST",
        url: "/build",
        data: {
          location: sourceTile,
          type: typeSelected,
          game_data: JSON.stringify(gameData)
        },
        success: function() {
          sourceTile = false;
        }
      });      
    } else if (event.keyCode == 17) {
      ctrlDown = false;
    } else if (event.keyCode == 16) {
      shiftDown = false;
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 17) {
      ctrlDown = true;
    } else if (event.keyCode == 16) {
      shiftDown = true;
    }
  });
}

function nextTurn() {
  $.ajax({
    method: "POST",
    url: "/next_turn",
    data: {
      game_data: JSON.stringify(gameData)
    },
    success: function() {
      sourceTile = false;
      targetTile = false; 
    }
  });
}
