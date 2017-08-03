class Square
  
  attr_reader :x, :y
  attr_accessor :player, :structure, :pieces

  def initialize(x, y, player = false, structure = false)
    @x = x
    @y = y
    @player = player
    @structure = structure
    @pieces = []
  end

  def add_piece(piece)
    @pieces << piece
    
  end

  def destroy_structure
    @structure = false
    
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
    count = 0
    number.times do
      @pieces.each do |piece|
        break if count >= number
        activation_has_occured = false
        if piece.inactive
          piece.activate
          activation_has_occured = true
          count += 1
        end
        # unless activation_has_occured
        #   raise StandardError.new "insufficient pieces in square upon `activate` method call at square (#{@x}, #{@y})"
        # end
      end
    end
  end

  def inactivate(number)
    count = 0
    number.times do
      @pieces.each do |piece|
        break if count >= number
        activation_has_occured = false
        if piece.active
          piece.inactivate
          activation_has_occured = true
          count += 1
        end
        # unless activation_has_occured
        #   raise StandardError.new "insufficient pieces in square upon `inactivate` method call at square (#{@x}, #{@y})"
        # end
      end
    end    
  end

  def remove_all
    @pieces = []
    
  end

  def remove_active(number)
    counter = 0
    @pieces.each_with_index do |piece, i| 
      break if counter == number
      if piece.active?
        @pieces[i] = nil
        counter += 1
      end
    end
    @pieces = @pieces.reject { |piece| piece.nil? }
  end

  def remove_inactive(number)
    counter = 0
    @pieces.each_with_index do |piece, i| 
      break if counter == number
      if piece.inactive?
        @pieces[i] = nil
        counter += 1
      end
    end
    @pieces = @pieces.reject { |piece| piece.nil? }
  end

  def farm?
    @structure == :farm
  end

  def city?
    @structure == :city
  end

  def empty?
    @pieces.empty?
  end

  def unowned?
    @player == false
  end

  def active
    count = 0
    @pieces.each { |piece| count += 1 if piece.active? }
    count
  end

  def inactive 
    count = 0
    @pieces.each { |piece| count += 1 if piece.inactive? }
    count
  end
end