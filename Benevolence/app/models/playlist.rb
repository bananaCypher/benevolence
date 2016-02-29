class Playlist
  include Mongoid::Document
  field :title, type: String
  belongs_to :user
  has_and_belongs_to_many :songs
end
