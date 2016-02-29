require 'rails_helper'

RSpec.describe Playlist, type: :model do
  before(:each) do
    @playlist = build(:playlist)
    @playlist.user = build(:user)
  end

  it "should have a title" do
    expect(@playlist.title).to eq('A Playlist')
  end
  it "should have an owner" do
    expect(@playlist.user.class.to_s).to eq('User')
  end
  it "can have multiple songs" do
    @playlist.songs.push(build(:song_one))
    @playlist.songs.push(build(:song_two))
    expect(@playlist.songs.length).to eq(2)
  end
end
