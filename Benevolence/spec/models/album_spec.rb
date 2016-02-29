require('rails_helper')

RSpec.describe Album, type: :model do
  before(:each) do
    @album = build(:album)
    @album.artist = build(:artist)
  end

  it "should have a name" do
    expect(@album.name).to eq('An Album')
  end

  it "should have an artist" do
    expect(@album.artist.class.to_s).to eq('Artist')
  end

  it "can have a year" do
    year = 1993
    @album.year = year
    expect(@album.year).to eq(1993)
  end

  it "can have a track_list" do
    track_list = ['song1', 'song2', 'song3']
    @album.track_list = track_list
    expect(@album.track_list.length).to eq(3)
  end

  it "can have multiple songs" do
    @album.songs.push(build(:song_one))
    @album.songs.push(build(:song_two))
    expect(@album.songs.length).to eq(2)
  end
end
