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

  def unique_songs
    unique_song_titles = []
    unique_song_ids = []
    self.songs.each do |song|
      if !unique_song_titles.include? song.title.downcase
        unique_song_titles.push(song.title.downcase)
        unique_song_ids.push(song.id.to_s)
      end 
    end
    return unique_song_ids
  end
end
