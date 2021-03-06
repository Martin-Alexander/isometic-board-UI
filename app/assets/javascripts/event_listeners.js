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
    if (tileOver.x > 11 || tileOver.y > 11) {
      return false;
    }
    if (gameOver) {
      console.log("game over");
    } else if (reinforcementPhase) {
      sourceTile = { x: tileOver.x, y: tileOver.y }
    } else {
      if (!sourceTile) {
        sourceTile = { x: tileOver.x, y: tileOver.y };
      } else if (sourceTile.x == tileOver.x && sourceTile.y == tileOver.y) {
        sourceTile = false;
        targetTile = false;
      } else {
        if (ctrlDown && !shiftDown) {
          var amountSelected = "half"
        } else if (shiftDown && !ctrlDown) {
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
            amount: amountSelected,
            key: my_key
          }
        });
        if (!(ctrlDown && shiftDown)) {
          sourceTile = false;
        }
        targetTile = false;
      }
    }
  });
  window.addEventListener("keyup", function(event) {
    if (gameOver) {
      console.log("game over");
    }
    else if ((event.keyCode == 87 || event.keyCode == 32) && reinforcementPhase) {
      if (event.keyCode == 32) {
        var typeSelected = "soldier";
      } else {
        var typeSelected = "worker";
      }
      if (shiftDown) {
        var amountSelected = "all";
      } else {
        var amountSelected = "one";
      }
      $.ajax({
        method: "POST",
        url: "/reinforcement",
        data: {
          location: sourceTile,
          type: typeSelected,
          amount: amountSelected,
          game_data: JSON.stringify(gameData),
          key: my_key
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
          game_data: JSON.stringify(gameData),
          key: my_key
        }
      });      
      sourceTile = false;
    } else if (event.keyCode == 17) {
      ctrlDown = false;
    } else if (event.keyCode == 16) {
      shiftDown = false;
    } else if (event.keyCode == 187) {
      scale = scale + 0.1;
      canvas.height = canvas.height * 1.1;
      canvasContext.translate(canvas.width / 2, 50);
    } else if (event.keyCode == 189) {
      scale = scale - 0.1;
      canvas.height = canvas.height / 1.1;
      canvasContext.translate(canvas.width / 2, 50);
    } else if (event.keyCode == 46) {
      // $.ajax({
      //   method: "POST",
      //   url: "/delete",
      //   data: {
      //     location: sourceTile,
      //     game_data: JSON.stringify(gameData),
      //     key: my_key
      //   }
      // });
      // sourceTile = false;
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
      game_data: JSON.stringify(gameData),
      key: my_key
    },
    success: function() {
      sourceTile = false;
      targetTile = false; 
    }
  });
}
