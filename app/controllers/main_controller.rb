class MainController < ApplicationController
  def home
  end

  def new
    player_one = Player.new(1, true)
    player_two = Player.new(2, false)
    board = Board.new(7, 7)
    board.initial_setup(player_one, player_two)

    game = Game.new(player_one, player_two, board)

    respond_to do |format|
      format.json { render json: game.stringify }
    end
  end

  def input
    game = Game.parse_and_create(params[:game_data])
    game.move(params[:from], params[:to])
    ActionCable.server.broadcast "game_channel", {
      game: game.stringify
    }
  end
end
