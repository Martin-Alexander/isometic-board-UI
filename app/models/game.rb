class Game
  require 'json'

  attr_reader :player_one, :player_two

  def initialize(player_one, player_two, board)
    @player_one = player_one
    @player_two = player_two
    @board = board
    @winner = 0
  end

  def move(from_coords, to_coords, amount)
    from_square = @board[from_coords['x'].to_i, from_coords['y'].to_i]
    to_square = @board[to_coords['x'].to_i, to_coords['y'].to_i]
    
    if from_square.active > 0 && are_adjacent_squares?(from_square, to_square) && from_square.player.is_turnplayer
      if !to_square.empty? && from_square.player != to_square.player && from_square.pieces[0].type == :soldier && to_square.pieces[0].type == :soldier
        # Fight
        attack_strength = from_square.active
        defense_strength = to_square.active + to_square.inactive

        from_square.inactivate_all
        to_square.inactivate_all

        from_square.remove_inactive(fight_losses(attack_strength, defense_strength))
        to_square.remove_inactive(fight_losses(defense_strength, attack_strength))

        from_square.player = false if from_square.empty? && from_square.structure == false
        to_square.player = false if to_square.empty? && to_square.structure == false

      elsif !to_square.empty? && from_square.player != to_square.player && from_square.pieces[0].type == :soldier && to_square.pieces[0].type == :worker
        # Raid
        to_square.remove_all
        from_square.inactivate_all
        if to_square.structure == false
          to_square.player = false
        end
      elsif to_square.empty? && from_square.player != to_square.player && from_square.pieces[0].type == :soldier && to_square.structure
        # Pillage
        to_square.structure = false
        to_square.player = false
        from_square.inactivate_all
        @winner = winner
      elsif to_square.unowned? || (to_square.active + to_square.inactive < 99 && !from_square.empty? && !to_square.empty? && from_square.pieces[0].type == to_square.pieces[0].type && from_square.player == to_square.player) || (to_square.empty? && to_square.player == from_square.player)
        # Move
        if amount == "all"
          number = from_square.active
        elsif amount == "half"
          if from_square.active == 1
            number = 1
          else
            number = from_square.active / 2
          end
        else 
          number = 1
        end
        number.times do
          to_square.add_piece(Piece.new(from_square.pieces[0].type, false))
        end
        to_square.player = from_square.player
        from_square.remove_active(number)
        if from_square.empty? && from_square.structure == false
          from_square.player = false 
        end
      end
    end
  end

  def winner
    player_one_city_count = 0
    player_two_city_count = 0
    (0...@board.y_size).each do |y|
      (0...@board.x_size).each do |x|
        if @board[x, y].structure == :city && @board[x, y].player == @player_one
          player_one_city_count += 1
        elsif @board[x, y].structure == :city && @board[x, y].player == @player_two
          player_two_city_count += 1
        end
      end
    end
    if player_one_city_count == 0
      return 2
    elsif player_two_city_count == 0
      return 1
    else
      return 0
    end
  end

  def reinforcements(coords, type, amount)
    type = type.to_sym
    square = @board[coords['x'].to_i, coords['y'].to_i]
    if square.player.is_turnplayer && square.structure == :city && square.player.reinforcements > 0 && (square.empty? || square.pieces[0].type == type) && square.pieces.length < 99
      if amount == "all" && (square.player.reinforcements + square.pieces.length) <= 99
        number = square.player.reinforcements
      else 
        number = 1
      end
      number.times do
        square.add_piece(Piece.new(type, true))
        square.player.reinforcements -= 1
      end
    end
  end

  def build(coords, type)
    type = type.to_sym
    square = @board[coords['x'].to_i, coords['y'].to_i]
    if square.player.is_turnplayer && !square.structure && square.pieces[0].type == :worker && square.active > 0
      square.remove_active(4)
      square.structure = type
    end    
  end

  def next_turn
    @player_one.is_turnplayer = !@player_one.is_turnplayer
    @player_two.is_turnplayer = !@player_two.is_turnplayer
    (0...@board.y_size).each do |y|
      (0...@board.x_size).each do |x|
        @board[x, y].activate_all
      end
    end
    if @player_one.is_turnplayer 
      @player_one.reinforcements += (number_of_farms(@player_one) / 4)
    else
      @player_two.reinforcements += (number_of_farms(@player_two) / 4)
    end
  end

  def number_of_farms(player) 
    counter = 0
    (0...@board.y_size).each do |y|
      (0...@board.x_size).each do |x|
        if @board[x, y].player == player && @board[x, y].structure == :farm
          counter += 1
        end
      end
    end
    counter
  end

  def fight_losses(my_strength, opponents_strength)
    if my_strength <= opponents_strength
      my_strength
    else
      opponents_strength / (my_strength / opponents_strength)
    end
  end

  def are_adjacent_squares?(one_square, two_square)
    one_square.x < two_square.x + 2 &&
    one_square.x > two_square.x - 2 &&
    one_square.y < two_square.y + 2 &&
    one_square.y > two_square.y - 2
  end

  def stringify
    game_data = { players: [], board: { rows: [] } }

    game_data[:players] = {
      player_one: {
        id: @player_one.id,
        is_turnplayer: @player_one.is_turnplayer,
        reinforcements: @player_one.reinforcements
      },
      player_two: {
        id: @player_two.id,
        is_turnplayer: @player_two.is_turnplayer,
        reinforcements: @player_two.reinforcements
      }
    }

    game_data[:board][:meta_data] = {
      x_size: @board.x_size,
      y_size: @board.y_size
    }

    @board.data.each do |row|
      game_data[:board][:rows] << []
      row.each do |square|
        if square.player
          square_player = { 
            id: square.player.id
          }
          
          # this shit has to changes
          if square.structure.to_s == "false"
            structure = false
          else
            structure = square.structure
          end

        else 
          square_player = false
          structure = false
        end
        square_data = {
          x: square.x,
          y: square.y,
          player: square_player,
          structure: structure,
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
      game_data["players"]["player_one"]["id"],
      game_data["players"]["player_one"]["is_turnplayer"],
      game_data["players"]["player_one"]["reinforcements"]
    )

    player_two = Player.new(
      game_data["players"]["player_two"]["id"],
      game_data["players"]["player_two"]["is_turnplayer"],
      game_data["players"]["player_two"]["reinforcements"]
    )

    board = Board.new(
      game_data["board"]["meta_data"]["x_size"],
      game_data["board"]["meta_data"]["y_size"]
    )

    (0...board.y_size).each do |y|
      (0...board.x_size).each do |x|
        square_obj = board[y, x]
        square_json = game_data["board"]["rows"][y][x]
        if square_json["player"]
          if square_json["player"]["id"] == player_one.id
            square_obj.player = player_one
          elsif square_json["player"]["id"] == player_two.id
            square_obj.player = player_two
          end

          # this shit has to changes
          if square_json["structure"] == false || square_json["structure"] == "false"
            square_obj.structure = false
          else 
            square_obj.structure = square_json["structure"].to_sym
          end

          pieces = []
          square_json["pieces"].each do |piece|
            pieces << Piece.new(
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

