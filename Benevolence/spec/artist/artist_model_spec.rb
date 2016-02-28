require('rails_helper')

describe Artist do
  before(:each) do
    @artist = Artist.new(name: 'An Artist')
    @small_art = 'http://lorempixel.com/200/200/'
    @large_art = 'http://lorempixel.com/1000/600/' 
    @biography = 'This is a test artist.'
    @album1 = Album.new()
    @album2 = Album.new()
    @song1 = Song.new()
    @song2 = Song.new()
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
    pending
  end
  it "should have a default large art if none given" do
    pending
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
