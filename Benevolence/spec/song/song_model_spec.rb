require('rails_helper')

describe Song do
  before(:each) do
    @song = Song.create(title: 'My Song', duration: 180)
  end

  it "should return the correct file path for it's mp3" do
    expect(@song.file_path).to eq("/Users/User/Documents/Programming/Benevolence/Benevolence/public/tracks/#{@song.id}.mp3")
  end
  it "should return the correct url path for it's mp3" do
    expect(@song.file_url).to eq("/tracks/#{@song.id}.mp3")
  end

end
