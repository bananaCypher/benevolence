class Album
  include Mongoid::Document
  field :name, type: String
  field :year, type: Integer
  field :track_list, type: Array
  belongs_to :artist
end
