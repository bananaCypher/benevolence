require('rails_helper')

describe Song do
  before(:each) do
    @song = Song.new(title: 'My Song', duration: 180)
    @uploader = User.new()
    @artist = Artist.new()
    @song.user = @uploader
    @song.artist = @artist
  end

  it "should have a title" do
    expect(@song.title).to eq('My Song')
  end
  it "should have a duration" do
    expect(@song.duration).to eq(180)
  end
  it "should have an uploader" do
    expect(@song.user.class.to_s).to eq('User')
  end
  it "should have an artist" do
    expect(@song.artist.class.to_s).to eq('Artist')
  end
  it "can have an album" do
    album = Album.new()
    @song.album = album
    expect(@song.album.class.to_s).to eq('Album')
  end
  it "should return the correct file path for it's mp3" do
    expect(@song.file_path).to eq("/Users/User/Documents/Programming/Benevolence/Benevolence/public/tracks/#{@song.id}.mp3")
  end
  it "should return the correct url path for it's mp3" do
    expect(@song.file_url).to eq("/tracks/#{@song.id}.mp3")
  end

end
