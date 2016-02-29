require 'rails_helper'
require 'securerandom'

RSpec.describe SongsController, type: :controller do
  include Devise::TestHelpers
  describe 'GET index' do
    before(:each) do
      create(:song_one)
      create(:song_one)
      create(:song_one)
      create(:song_one)
      create(:song_one)
    end
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
      create(:song_one)
      create(:song_one)
      create(:song_one)
      create(:song_one)
      create(:song_one)
      @song = create(:song_one)
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
      songs = Song.where(:id.ne => @song.id)
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
      @user = create(:user)
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
      random = SecureRandom.uuid
      post :create, {song: {title: random}}
      expect(Song.where(title: random).length).to eq(1)
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
      @song = create(:song_one)
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

  describe 'DELETE destroy' do
    before(:each) do
      @song = create(:song_one)
    end
    it 'should respond with JSON' do
      delete :destroy, {id: @song.id}
      expect(response.content_type). to eq("application/json")
    end
    it 'should delete the given song' do
      random = SecureRandom.uuid
      song = Song.create(title: random)
      delete :destroy, {id: song.id}
      expect(Song.where(title: random).length).to eq(0)
    end
    it "should return an error if the song isn't found" do
      delete :destroy, {id: 'justanotherfakeid'}
      expect(response.body).to match /"status":"error"/
    end
    it "should return a success message if the song was deleted" do
      delete :destroy, {id: @song.id}
      expect(response.body).to match /"status":"success"/
    end
  end
end
