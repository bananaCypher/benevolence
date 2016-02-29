require 'rails_helper'

RSpec.describe PlaylistsController, type: :controller do
  describe 'GET index' do
    before(:each) do
      create(:playlist)
      create(:playlist)
      create(:playlist)
      create(:playlist)
      create(:playlist)
    end
    it 'should respond with JSON' do
      get :index
      expect(response.content_type).to eq "application/json"
    end
    it 'should contain all the playlists' do
      get :index
      ids = Playlist.all.map{|p| p.id }
      ids.each do |id|
        expect(response.body).to match /"#{id}\"}/
      end
    end
  end

  describe 'GET show' do
    before(:each) do
      create(:playlist)
      create(:playlist)
      create(:playlist)
      @playlist = create(:playlist) 
    end
    it 'should respond with JSON' do
      get :show, {id: @playlist.id}
      expect(response.content_type).to eq "application/json"
    end
    it 'should return the requested playlist' do
      get :show, {id: @playlist.id}
      expect(response.body).to match /"#{@playlist.id}"/
    end
    it 'should return only the requested playlist' do
      get :show, {id: @playlist.id}
      playlists = Playlist.where(:id.ne => @playlist.id)
      ids = playlists.map{|p| p.id }
      ids.each do |id|
        expect(response.body).to_not match /"#{id}\"}/
      end
    end
    it "should return an error if the playlist isn't found" do
      get :show, {id: 'iamsuchafakeid'}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'POST create' do
    before(:each) do
      @user = create(:user)
      def controller.current_user
        return @user
      end
      @playlist_object = {playlist: {title: 'A Playlist'}}
    end
    it 'should respond with JSON' do
      post :create, @playlist_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should be able to create a new playlist' do
      random = SecureRandom.uuid
      post :create, {playlist: {title: random}}
      expect(Playlist.where(title: random).length).to eq(1)
    end
    it 'should return a success message if playlist was created' do
      post :create, @playlist_object
      expect(response.body).to match /"status":"success"/
    end
    it 'should return an error message if playlist failed to create' do
      post :create, {random_key: 'random stuff'}
      expect(response.body).to match /"status":"error"/
    end
  end
  
  describe 'PUT update' do
    before(:all) do
      @playlist = create(:playlist)
      @update_object = {id: @playlist.id, playlist: {title: 'New Playlist'}}
    end
    before(:each) do
      @playlist.update(title: 'A Playlist')
    end
    it 'should respond with JSON' do
      put :update, @update_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should update the given playlist' do
      put :update, @update_object
      playlist = Playlist.find(@playlist.id)
      expect(playlist.title).to eq('New Playlist')
    end
    it 'should not update any other playlists' do
      playlists = Playlist.all.find_all {|p| p.id != @playlist.id}
      put :update, @update_object
      new_playlists = Playlist.all.find_all {|p| p.id != @playlist.id}
      new_playlists.each_with_index do |p, i|
        expect(p.title).to eq(playlists[i].title)
      end
    end
    it "should return a success message if the playlist was updated" do
      put :update, @update_object
      expect(response.body).to match /"status":"success"/
    end
    it "should return an error if the playlist isn't found" do
      put :update, {id: 'fakeashellid', playlist: {title: 'New Playlist'}}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'DELETE destroy' do
    before(:each) do
      @playlist = create(:playlist)
    end
    it 'should respond with JSON' do
      delete :destroy, {id: @playlist.id}
      expect(response.content_type). to eq("application/json")
    end
    it 'should delete the given playlist' do
      random = SecureRandom.uuid
      playlist = Playlist.create(title: random)
      delete :destroy, {id: playlist.id}
      expect(Playlist.where(title: random).length).to eq(0)
    end
    it "should return an error if the playlist isn't found" do
      delete :destroy, {id: 'justanotherfakeid'}
      expect(response.body).to match /"status":"error"/
    end
    it "should return a success message if the playlist was deleted" do
      delete :destroy, {id: @playlist.id}
      expect(response.body).to match /"status":"success"/
    end
  end
end
