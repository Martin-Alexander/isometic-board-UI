App.game = App.cable.subscriptions.create("GameChannel", {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    gameData = JSON.parse(data.game);
    setBoard(gameData);
    if (gameData.players.player_one.is_turnplayer) {
      $("#turnplayer").text("Player One's Turn").css({"color": "blue"});
    } else {
      $("#turnplayer").text("Player Two's Turn").css({"color": "red"});
    }
    $("#player-one-reinforcements").text(gameData.players.player_one.reinforcements);
    $("#player-two-reinforcements").text(gameData.players.player_two.reinforcements);
    $("#player-one-farms").text(data.number_of_farms_player_one);
    $("#player-two-farms").text(data.number_of_farms_player_two);
    $("#player-one-bases").text(data.number_of_bases_player_one);
    $("#player-two-bases").text(data.number_of_bases_player_two);
    if (data.winner == 1) {
      $("#turnplayer").text("Player One Wins!").css({"color" : "blue"});
      gameOver = true;
    } else if (data.winner == 2) {
      $("#turnplayer").text("Player Two Wins!").css({"color" : "red"});
      gameOver = true;
    }
  }
});