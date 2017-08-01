class Square

  include SquareProperties

  attr_reader :x, :y, :player, :structure, :pieces

  def initialize(x, y, player = false, structure = false)
    @x = x
    @y = y
    @player = player
    @structure = structure
    @pieces = []
  end

  def add_piece(piece)
    @pieces << piece
    update
  end

  def destroy_structure
    @structure = false
    update
  end

  def add_structure(structure_sym)
    @structure = structure_sym
  end

  def activate_all
    @pieces.each { |piece| piece.activate }
  end

  def inactivate_all
    @pieces.each { |piece| piece.inactivate }
  end

  def activate(number)
    number.times do
      @pieces.each do |piece|
        activation_has_occured = false
        if piece.inactive
          piece.activate
          activation_has_occured = true
        end
        unless activation_has_occured
          raise StandardError.new "insufficient pieces in square upon `activate` method call at square (#{@x}, #{@y})"
        end
      end
    end
  end

  def inactivate(number)
    number.times do
      @pieces.each do |piece|
        activation_has_occured = false
        if piece.active
          piece.inactivate
          activation_has_occured = true
        end
        unless activation_has_occured
          raise StandardError.new "insufficient pieces in square upon `inactivate` method call at square (#{@x}, #{@y})"
        end
      end
    end    
  end

  def remove_all
    @pieces = []
    update
  end

  def remove_active(number)
    @pieces.delete_if { |piece| piece.active }
    update
  end

  def remove_inactive(number)
    @pieces.delete_if { |piece| piece.inactive }
    update
  end

  private

  def update
    run_validations
    if @pieces.empty? 
      if @structure == false
        @player = false
      end
    else
      @player = @pieces[0].player
    end

  end

  def run_validations
    @pieces.each do |piece|
      if piece.player != @player
        raise StandardError.new "square/piece player missmatch at square (#{@x}, #{@y})"
      end
    end
    unless @pieces.all? { |piece| piece.type == :soldier} || @pieces.all? { |piece| piece.type == :worker}
      raise StandardError.new "conflicting piece types on square (#{@x}, #{@y})"
    end
  end
end