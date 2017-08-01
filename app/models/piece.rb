class Piece
  
  attr_reader :type, :active

  def initialize(type, active)
    @type = type
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