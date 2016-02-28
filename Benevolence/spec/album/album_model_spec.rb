require('rails_helper')

describe Album do
  before(:each) do
    @album = Album.new(name: 'An Album')
    @artist = Artist.new(name: 'An Artist')
    @album.artist = @artist
    @song1 = Song.new()
    @song2 = Song.new()
    field :name, type: String
    field :year, type: Integer
    field :track_list, type: Array
    belongs_to :artist
    has_many :songs
  end

  it "should have a name" do
    expect(@artist.name).to eq('An Artist')
  end
  it "can have small art" do
    @artist.small_art = @small_art
    expect(@artist.small_art).to eq('http://lorempixel.com/200/200/')
  end
  it "can have large art" do
    @artist.large_art = @large_art
    expect(@artist.large_art).to eq('http://lorempixel.com/1000/600/')
  end
  it "should have a default small art if none given" do
    expect(@artist.small_art).to eq(@default_small)
  end
  it "should have a default large art if none given" do
    expect(@artist.large_art).to eq(@default_large)
  end
  it "can have biography" do
    @artist.biography = @biography
    expect(@artist.biography).to eq('This is a test artist.')
  end
  it "can have multiple albums" do
    @artist.albums.push(@album1)
    @artist.albums.push(@album2)
    expect(@artist.albums.length).to eq(2)
  end
  it "can have multiple songs" do
    @artist.songs.push(@song1)
    @artist.songs.push(@song2)
    expect(@artist.songs.length).to eq(2)
  end

end
