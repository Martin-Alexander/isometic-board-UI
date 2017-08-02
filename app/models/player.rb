class Player
  attr_reader :id
  attr_accessor :is_turnplayer, :reinforcements

  def initialize(id, is_turnplayer, reinforcements)
    @id = id
    @is_turnplayer = is_turnplayer
    @reinforcements = reinforcements
  end
end