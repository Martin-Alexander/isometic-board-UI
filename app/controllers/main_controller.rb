class MainController < ApplicationController
  def home
  end

  def new
    player_one = Player.new(1, true, 5)
    player_two = Player.new(2, false, 0)
    board = Board.new(12, 12)
    board.initial_setup(player_one, player_two)

    game = Game.new(player_one, player_two, board)

    respond_to do |format|
      format.json { render json: game.stringify }
    end
  end

  def move
    game = Game.parse_and_create(params[:game_data])
    # if (game.player_two.is_turnplayer && params[:key].to_i == 6666) || (game.player_one.is_turnplayer && params[:key].to_i == 4321)
      game.move(params[:from], params[:to], params[:amount])
      winner = 0
      if game.winner
        winner = game.winner
      end
      ActionCable.server.broadcast "game_channel", {
        game: game.stringify,
        number_of_bases_player_one: game.number_of_cities(game.player_one),
        number_of_bases_player_two: game.number_of_cities(game.player_two),
        number_of_farms_player_one: game.number_of_farms(game.player_one),
        number_of_farms_player_two: game.number_of_farms(game.player_two),
        winner: winner
      }
    # end
  end

  def next_turn
    game = Game.parse_and_create(params[:game_data])
    # if (game.player_two.is_turnplayer && params[:key].to_i == 6666) || (game.player_one.is_turnplayer && params[:key].to_i == 4321)
      game.next_turn
      ActionCable.server.broadcast "game_channel", {
        game: game.stringify,
        number_of_bases_player_one: game.number_of_cities(game.player_one),
        number_of_bases_player_two: game.number_of_cities(game.player_two),
        number_of_farms_player_one: game.number_of_farms(game.player_one),
        number_of_farms_player_two: game.number_of_farms(game.player_two)
      }
    # end
  end

  def reinforcement
    game = Game.parse_and_create(params[:game_data])
    # if (game.player_two.is_turnplayer && params[:key].to_i == 6666) || (game.player_one.is_turnplayer && params[:key].to_i == 4321)
      game.reinforcements(params[:location], params[:type], params[:amount])
      ActionCable.server.broadcast "game_channel", {
        game: game.stringify,
        number_of_bases_player_one: game.number_of_cities(game.player_one),
        number_of_bases_player_two: game.number_of_cities(game.player_two),
        number_of_farms_player_one: game.number_of_farms(game.player_one),
        number_of_farms_player_two: game.number_of_farms(game.player_two)
      }
    # end
  end

  def build
    game = Game.parse_and_create(params[:game_data])
    # if (game.player_two.is_turnplayer && params[:key].to_i == 6666) || (game.player_one.is_turnplayer && params[:key].to_i == 4321)
      game.build(params[:location], params[:type])
      ActionCable.server.broadcast "game_channel", {
        game: game.stringify,
        number_of_bases_player_one: game.number_of_cities(game.player_one),
        number_of_bases_player_two: game.number_of_cities(game.player_two),
        number_of_farms_player_one: game.number_of_farms(game.player_one),
        number_of_farms_player_two: game.number_of_farms(game.player_two)
      }
    # end
  end

  def delete
    game = Game.parse_and_create(params[:game_data])
    game.delete(params[:location])
    winner = 0
    if game.winner
      winner = game.winner
    end
    ActionCable.server.broadcast "game_channel", {
      game: game.stringify,
      number_of_bases_player_one: game.number_of_cities(game.player_one),
      number_of_bases_player_two: game.number_of_cities(game.player_two),
      number_of_farms_player_one: game.number_of_farms(game.player_one),
      number_of_farms_player_two: game.number_of_farms(game.player_two),
      winner: winner
    }
  end
end
