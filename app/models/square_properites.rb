module SquareProperties
  def farm?
    @structure == :farm
  end

  def city?
    @structure == :city
  end

  def empty?
    @units.empty?
  end

  def unowned?
    @player == false
  end

  def active
    count = 0
    @units.each { |piece| count += 1 if piece.active }
    count
  end

  def inactive 
    count = 0
    @units.each { |piece| count += 1 if piece.inactive }
    count
  end
end