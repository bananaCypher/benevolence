require('rails_helper')

RSpec.describe User, type: :model do
  before(:each) do
    @user = build(:user)
  end

  it "should have a name" do
    expect(@user.name).to eq('A User')
  end
  it "can have a profile picture" do
    @user.profile_picture = 'http://lorempixel.com/200/200/' 
    expect(@user.profile_picture).to eq('http://lorempixel.com/200/200/')
  end
  it "should have a default profile picture if none is defined" do
    expect(@user.profile_picture).to eq('/logo.png')
  end
  it "can have multiple uploaded songs" do
    @user.songs.push(build(:song_one))
    @user.songs.push(build(:song_two))
    expect(@user.songs.length).to eq(2)
  end
end
