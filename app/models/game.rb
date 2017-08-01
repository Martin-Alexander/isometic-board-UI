class Game
  require 'json'

  def initialize(player_one, player_two, board)
    @player_one = player_one
    @player_two = player_two
    @board = board
  end

  def stringify
    game_data = { players: [], board: { rows: [] } }

    game_data[:players] = [
      player_one: {
        id: @player_one.id,
        is_turnplayer: @player_one.is_turnplayer
      },
      player_two: {
        id: @player_two.id,
        is_turnplayer: @player_two.is_turnplayer        
      }
    ]

    game_data[:board][:meta_data] = {
      x_size: @board.x_size,
      y_size: @board.y_size
    }

    @board.data.each do |row|
      game_data[:board][:rows] << []
      row.each do |square|
        if square.player
          square_player = { id: square.player.id }
        else 
          square_player = false
        end
        square_data = {
          x: square.x,
          y: square.y,
          player: square_player,
          structure: square.structure.to_s,
          active: square.active,
          inactive: square.inactive,
          pieces: []
        }
        square.pieces.each do |piece|
          piece_data = {
            type: piece.type.to_s,
            active: piece.active
          }
          square_data[:pieces] << piece_data
        end
        game_data[:board][:rows].last << square_data
      end
    end
    JSON.generate(game_data)
  end

  def self.parse_and_create(json)
    game_data = JSON.parse(json)

    player_one = Player.new(
      game_data["player_one"]["id"],
      game_data["player_one"]["is_turnplayer"]
    )

    player_two = Player.new(
      game_data["player_two"]["id"],
      game_data["player_two"]["is_turnplayer"]
    )

    board = Board.new(
      game_data["board"]["meta_data"]["x_size"],
      game_data["board"]["meta_data"]["y_size"]
    )

    (0...board.y_size).each do |y|
      (0...board.x_size).each do |x|
        square_obj = board[x, y]
        square_json = game_data["board"]["rows"][y][x]
        if square_json["player"]
          if square_json["player"]["id"] == player_one.id
            square_obj.player = player_one
          elsif square_json["player"]["id"] == player_two.id
            square_obj.player = player_two
          end
          square_obj.structure = square_json["structure"].to_sym
          pieaces = []
          square_json["pieces"].each do |piece|
            pieaces << Piece.new(
              piece["type"].to_sym,
              piece["active"]
            )
          end
          square_obj.pieces = pieces
        else
          square_obj.structure = false
          square_obj.pieces = []
        end
      end
    end
    Game.new(player_one, player_two, board)
  end
end

