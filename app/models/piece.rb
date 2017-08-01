class Piece
  
  attr_reader :type, :player, :active

  def initialize(type, player, active)
    @type = type
    @player = player
    @active = active
  end

  def inactivate
    @active = false
  end

  def activate
    @active = true
  end

  def active?
    @active
  end

  def inactive?
    !@active
  end
end