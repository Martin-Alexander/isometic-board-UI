class Board
  attr_reader :x_size, :y_size, :data

  def initialize(x_size, y_size)
    @x_size = x_size
    @y_size = y_size
    @data = []
    (0...y_size).each do |y|
      @data << []
      (0...x_size).each do |x|
        @data.last << Square.new(x, y)
      end
    end
  end

  def [](x, y)
    run_validations(x, y)
    @data[x][y]
  end

  def initial_setup(player_one, player_two)
    self[1, 3].player = player_one
    self[1, 3].structure = :city
    self[2, 3].player = player_one
    self[2, 3].pieces << Piece.new(:worker, true)
    self[0, 3].structure = :farm
    self[0, 3].player = player_one
    self[1, 4].structure = :farm
    self[1, 4].player = player_one
    self[1, 2].structure = :farm
    self[1, 2].player = player_one

    self[5, 3].player = player_two
    self[5, 3].structure = :city
    self[4, 3].player = player_two
    10.times do
      self[4, 3].pieces << Piece.new(:soldier, true)
    end
    self[6, 3].structure = :farm
    self[6, 3].player = player_two
    self[4, 4].structure = :farm
    self[4, 4].player = player_two
    self[4, 2].structure = :farm
    self[4, 2].player = player_two
  end

  private 

  def run_validations(x, y)
    if x > x_size - 1
      raise StandardError.new "x value of `#{x}` out of range: max is #{@x_size - 1}"
    end
    if y > y_size - 1
      raise StandardError.new "x value of `#{y}` out of range: max is #{@y_size - 1}"
    end
    if @data.length != y_size
      raise StandardError.new "board contains too many rows!"
    end
    @data.each do |row|
      if row.length != x_size
        raise StandardError.new "board contains too many columns!"
      end
    end
  end
end