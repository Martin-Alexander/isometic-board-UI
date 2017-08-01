App.game = App.cable.subscriptions.create("GameChannel", {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    gameData = JSON.parse(data.game);
    setBoard(gameData);

  }
});