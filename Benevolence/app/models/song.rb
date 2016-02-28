BASE_URL_PATH = '/tracks/'
BASE_FILE_PATH = "#{Rails.root}/public/tracks/" 

class Song
  include Mongoid::Document; Mongoid.raise_not_found_error = false
  field :title, type: String
  field :duration, type: Integer
  belongs_to :user
  belongs_to :artist
  belongs_to :album

  def file_url
    BASE_URL_PATH + self.id + '.mp3'
  end

  def file_path
    BASE_FILE_PATH + self.id + '.mp3'
  end
end
