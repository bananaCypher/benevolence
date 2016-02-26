class Song
  include Mongoid::Document
  field :title, type: String
  field :duration, type: Integer
  belongs_to :user
  belongs_to :artist
  belongs_to :album
end
