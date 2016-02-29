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
      playlists = playlist.where(:id.ne => @playlist.id)
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
end
