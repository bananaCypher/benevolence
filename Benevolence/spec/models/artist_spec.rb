require('rails_helper')

RSpec.describe Artist, type: :model do
  before(:each) do
    @artist = build(:artist)
    @small_art = 'http://lorempixel.com/200/200/'
    @large_art = 'http://lorempixel.com/1000/600/' 
    @default_small = '/logo.png'
    @default_large = '/space.jpg'
    @biography = 'This is a test artist.'
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
    @artist.albums.push(build(:album))
    @artist.albums.push(build(:album_two))
    expect(@artist.albums.length).to eq(2)
  end
  it "can have multiple songs" do
    @artist.songs.push(build(:song_one))
    @artist.songs.push(build(:song_two))
    expect(@artist.songs.length).to eq(2)
  end

end
