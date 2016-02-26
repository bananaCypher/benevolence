class Artist
  include Mongoid::Document
  field :name, type: String
  field :small_art, type: String
  field :large_art, type: String
  field :biography, type: String
  has_many :albums
end
