class MainController < ApplicationController
  def home
  end

  def new
    player_one = Player.new(1, true)
    player_two = Player.new(2, false)
    board = Board.new(7, 7)

    board[1, 3].player = player_one
    board[1, 3].structure = :city
    board[2, 3].player = player_one
    board[2, 3].pieces << Piece.new(:worker, true)

    board[5, 3].player = player_two
    board[5, 3].structure = :city
    board[4, 3].player = player_two
    10.times do
      board[4, 3].pieces << Piece.new(:soldier, true)
    end
    game = Game.new(player_one, player_two, board)

    respond_to do |format|
      format.json { render json: game.stringify }
    end
  end

  def input
    game = Game.parse_and_create(params[:game])
    ActionCable.server.broadcast "game_channel", {
      from: params[:from],
      to: params[:to],
      game: game.stringify
    }
  end
end
