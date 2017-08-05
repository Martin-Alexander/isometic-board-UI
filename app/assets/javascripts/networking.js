// Makes a POST request to the serve with given data and to give url/action
function sendToServer(params) {
  $.ajax({
    method: "POST",
    url: "/" + params.action,
    data: params.data
  });
}

// Takes in JSON from the server and updates the board object
function setBoard(jsonGameData) {

  board.empty();

  xSize = jsonGameData.board.meta_data.x_size
  ySize = jsonGameData.board.meta_data.y_size

  for (var y = 0; y < ySize; y++) {
    for (var x = 0; x < xSize; x++) {

      jsonSquare = jsonGameData.board.rows[y][x]
      newSquare = board.square(x, y);
      
      newSquare.x = jsonSquare.x;
      newSquare.y = jsonSquare.y;
      newSquare.grass = 6;
      newSquare.player = jsonSquare.player.id;
      newSquare.structure = jsonSquare.structure;

      for (var i = 0; i < jsonSquare.pieces.length; i++) {

        newPiece = new Unit()

        newPiece.square = newSquare;
        newPiece.type = jsonSquare.pieces[0].type;
        newPiece.active = jsonSquare.pieces[0].active;
        newSquare.units.push(newPiece);
      }
    }
  }
}

// Takes in JSON from server and updates the game object
function setGame(jsonGameData) {

  game.playerOne = {
    gold: jsonGameData.players.player_one.reinforcements,
    isTurnplayer: jsonGameData.players.player_one.is_turnplayer
    // numberOfFarms: jsonGameData.players.player_one.number_of_farms,
    // numberOfCities: jsonGameData.players.player_one.number_of_cities,
    // income: Math.floor(jsonGameData.players.player_one.reinforcements / 4) - jsonGameData.players.player_one.number_of_farms
  }

  game.playerTwo = {
    gold: jsonGameData.players.player_two.reinforcements,
    isTurnplayer: jsonGameData.players.player_two.is_turnplayer
    // numberOfFarms: jsonGameData.players.player_two.number_of_farms,
    // numberOfCities: jsonGameData.players.player_two.number_of_cities,
    // income: Math.floor(jsonGameData.players.player_two.reinforcements / 4) - jsonGameData.players.player_two.number_of_farms
  }

  game.board = board;
}

// Parses server broadcast into JSON and sets board and game data
function updateFromServer(data) {
  jsonGameData = JSON.parse(data);
  setBoard(jsonGameData);
  setGame(jsonGameData);
}