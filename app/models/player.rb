class Player
  attr_reader :id, :is_turnplayer

  def initialize(id, is_turnplayer)
    @id = id
    @is_turnplayer = is_turnplayer
  end
end