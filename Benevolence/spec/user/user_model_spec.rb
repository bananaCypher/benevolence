require('rails_helper')

describe User do
  before(:each) do
    @user = User.new(name: 'A User')
    @art = 'http://lorempixel.com/200/200/'
    @song1 = Song.new()
    @song2 = Song.new()
  end

  it "should have a name" do
    expect(@user.name).to eq('A User')
  end
  it "can have a profile picture" do
    @user.profile_picture = @art
    expect(@user.profile_picture).to eq('http://lorempixel.com/200/200/')

  end
  it "should have a default profile picture if none is defined" do
    expect(@user.profile_picture).to eq('/logo.png')
  end
  it "can have multiple uploaded songs" do
    @user.songs.push(@song1)
    @user.songs.push(@song2)
    expect(@user.songs.length).to eq(2)
  end
end
