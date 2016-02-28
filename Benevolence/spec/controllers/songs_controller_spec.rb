require 'rails_helper'

RSpec.describe SongsController, type: :controller do
  include Devise::TestHelpers
  describe 'GET index' do
    it 'should respond with JSON' do
      get :index
      expect(response.content_type).to eq "application/json"
    end
    it 'should contain all the songs' do
      get :index
      ids = Song.all.map{|s| s.id }
      ids.each do |id|
        expect(response.body).to match /"#{id}\"}/
      end
    end
    it 'should include the songs file url' do
      get :index
      expect(response.body).to match /"file_url":/
    end
  end

  describe 'GET show' do
    before(:all) do
      @song = Song.create(title: 'A Song', duration: 180)
    end
    it 'should respond with JSON' do
      get :show, {id: @song.id}
      expect(response.content_type).to eq "application/json"
    end
    it 'should return the requested song' do
      get :show, {id: @song.id}
      expect(response.body).to match /"#{@song.id}"/
    end
    it 'should return only the requested song' do
      get :show, {id: @song.id}
      songs = Song.all[0..Song.all.length - 2]
      ids = songs.map{|s| s.id }
      ids.each do |id|
        expect(response.body).to_not match /"#{id}\"}/
      end
    end
    it "should return an error if the song isn't found" do
      get :show, {id: 'iamsuchafakeid'}
      expect(response.body).to match /"status":"error"/
    end
    it 'should include the songs file url' do
      get :show, {id: @song.id}
      expect(response.body).to match /"file_url":/
    end
  end

  describe 'POST create' do
    before(:each) do
      @user = User.new(name: 'Test User')
      def controller.current_user
        return @user
      end
      @song_object = {song: {title: 'A Song'}}
    end
    it 'should respond with JSON' do
      post :create, @song_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should be able to create a new song' do
      time = Time.now
      post :create, {song: {title: time.to_s}}
      expect(Song.where(title: time.to_s).length).to eq(1)
    end
    it 'should return a success message if song was created' do
      post :create, @song_object
      expect(response.body).to match /"status":"success"/
    end
    it 'should return an error message if song failed to create' do
      post :create, {random_key: 'random stuff'}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'PUT update' do
    before(:all) do
      @song = Song.create(title: 'A Song', duration: 180)
      @update_object = {id: @song.id, song: {title: 'New Song'}}
    end
    before(:each) do
      @song.update(title: 'A Song', duration: 180)
    end
    it 'should respond with JSON' do
      put :update, @update_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should update the given song' do
      put :update, @update_object
      song = Song.find(@song.id)
      expect(song.title).to eq('New Song')
    end
    it 'should not update any other songs' do
      songs = Song.all.find_all {|s| s.id != @song.id}
      put :update, @update_object
      new_songs = Song.all.find_all {|s| s.id != @song.id}
      new_songs.each_with_index do |s, i|
        expect(s.title).to eq(songs[i].title)
      end
    end
    it "should return a success message if the song was updated" do
      put :update, @update_object
      expect(response.body).to match /"status":"success"/
    end
    it "should return an error if the song isn't found" do
      put :update, {id: 'fakeashellid', song: {title: 'New Song'}}
      expect(response.body).to match /"status":"error"/
    end
  end
end
