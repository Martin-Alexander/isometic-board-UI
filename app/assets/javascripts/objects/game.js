function Game() {

  this.over = false;
  this.turnNumber = 1;

  this.playerOne = {
    gold: 4,
    isTurnplayer: true,
    numberOfFarms: 20,
    numberOfCities: 1,
    income: 4
  }

  this.playerTwo = {
    gold: 0,
    isTurnplayer: false,
    numberOfFarms: 20,
    numberOfCities: 1,
    income: 4
  }

  this.board;
}