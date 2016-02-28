class Artist
  include Mongoid::Document
  field :name, type: String
  field :small_art, type: String
  field :large_art, type: String
  field :biography, type: String
  has_many :albums
  has_many :songs

  after_initialize :default_values

  def default_values
    self.small_art ||= '/logo.png'
    self.large_art ||= '/space.jpg'
  end
end
