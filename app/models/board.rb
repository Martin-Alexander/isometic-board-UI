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
    self[2, 2].player = player_one
    self[2, 2].structure = :city
    10.times do 
      self[2, 2].pieces << Piece.new(:soldier, true)
    end

    [
      [1, 1], [1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2], [3, 3],
      [0, 1], [0, 2], [0, 3], [4, 1], [4, 2], [4, 3], [1, 0], [2, 0], [3, 0], [1, 4], [2, 4], [3, 4], [3, 4] 
    ].each do |square|
      self[square[0], square[1]].player = player_one
      self[square[0], square[1]].structure = :farm
    end

    self[9, 9].player = player_two
    self[9, 9].structure = :city
    10.times do 
      self[9, 9].pieces << Piece.new(:soldier, true)
    end

    [
      [1, 1], [1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2], [3, 3],
      [0, 1], [0, 2], [0, 3], [4, 1], [4, 2], [4, 3], [1, 0], [2, 0], [3, 0], [1, 4], [2, 4], [3, 4], [3, 4] 
    ].each do |square|
      self[square[0] + 7, square[1] + 7].player = player_two
      self[square[0] + 7, square[1] + 7].structure = :farm
    end
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