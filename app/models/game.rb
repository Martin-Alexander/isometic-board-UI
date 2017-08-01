class Game
  require 'json'

  def initialize(player_one, player_two, board)
    @player_one = player_one
    @player_two = player_two
    @board = board
  end

  def stringify
    game_data = { players: [], board: [] }

    game_data[:players] = [
      player_one: {
        number: @player_one.id,
        is_turnplayer: @player_one.is_turnplayer
      },
      player_two: {
        number: @player_two.id,
        is_turnplayer: @player_two.is_turnplayer        
      }
    ]
    @board.data.each do |row|
      row.each do |square|
        square_data = {
          x: square.x,
          y: square.y,
          player: square.player.id,
          structure: square.structure.to_s,
          pieces: []
        }
        square.pieces.each do |piece|
          piece_data = {
            type: piece.type.to_s,
            player: piece.player.id,
            active: piece.active
          }
          square_data[:pieces] << piece_data
        end
        game_data[:board] << square_data
      end
    end
    JSON.stringify(game_data)
  end
end

