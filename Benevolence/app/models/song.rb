BASE_URL_PATH = '/tracks/'
BASE_FILE_PATH = "#{Rails.root}/public/tracks/" 

class Song
  include Mongoid::Document
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

  def to_json
    object = {
      title: self.title,
      duration: self.duration,
      artist: self.artist.id,
      album: self.album.id,
      url: self.file_url
    }
    return object.to_json
  end
end

