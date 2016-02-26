class Song
  include Mongoid::Document
  field :title, type: String
  field :duration, type: Integer
end
