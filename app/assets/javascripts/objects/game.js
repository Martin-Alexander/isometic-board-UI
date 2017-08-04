function Game() {

  this.over = false;
  this.turnNumber = 1;

  this.playerOne = {
    gold: 0,
    isTurnplayer: true;
  }

  this.playerTwo = {
    gold: 0,
    isTurnplayer: false
  }

  this.board;
}