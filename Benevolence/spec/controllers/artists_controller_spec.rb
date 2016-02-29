require 'rails_helper'

RSpec.describe ArtistsController, type: :controller do
  describe 'GET index' do
    before(:each) do
      create(:artist)
      create(:artist)
      create(:artist)
      create(:artist)
      create(:artist)
      create(:artist)
    end
    it 'should respond with JSON' do
      get :index
      expect(response.content_type).to eq "application/json"
    end
    it 'should contain all the artists' do
      get :index
      ids = Artist.all.map{|s| s.id }
      ids.each do |id|
        expect(response.body).to match /"#{id}\"}/
      end
    end
  end
  
  describe 'GET show' do
    before(:each) do
      create(:artist)
      create(:artist)
      create(:artist)
      @artist = create(:artist) 
    end
    it 'should respond with JSON' do
      get :show, {id: @artist.id}
      expect(response.content_type).to eq "application/json"
    end
    it 'should return the requested artist' do
      get :show, {id: @artist.id}
      expect(response.body).to match /"#{@artist.id}"/
    end
    it 'should return only the requested artist' do
      get :show, {id: @artist.id}
      artists = Artist.where(:id.ne => @artist.id)
      ids = artists.map{|s| s.id }
      ids.each do |id|
        expect(response.body).to_not match /"#{id}\"}/
      end
    end
    it "should return an error if the artist isn't found" do
      get :show, {id: 'iamsuchafakeid'}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'POST create' do
    before(:each) do
      @artist_object = {artist: {name: 'An Artist'}}
    end
    it 'should respond with JSON' do
      post :create, @artist_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should be able to create a new artist' do
      random = SecureRandom.uuid
      post :create, {artist: {name: random}}
      expect(Artist.where(name: random).length).to eq(1)
    end
    it 'should return a success message if artist was created' do
      post :create, @artist_object
      expect(response.body).to match /"status":"success"/
    end
    it 'should return an error message if artist failed to create' do
      post :create, {random_key: 'random stuff'}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'PUT update' do
    before(:each) do
      @artist = create(:artist)
      @update_object = {id: @artist.id, artist: {name: 'An updated Artist'}}
    end
    it 'should respond with JSON' do
      post :update, @update_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should update the given artist' do
      put :update, @update_object
      artist = Artist.find(@artist.id)
      expect(artist.name).to eq('An updated Artist')
    end
    it 'should not update any other artists' do
      artists = Artist.all.find_all {|a| a.id != @artist.id}
      put :update, @update_object
      new_artists = Artist.all.find_all {|a| a.id != @artist.id}
      new_artists.each_with_index do |a, i|
        expect(a.name).to eq(artists[i].name)
      end
    end
    it "should return a success message if the artist was updated" do
      put :update, @update_object
      expect(response.body).to match /"status":"success"/
    end
    it "should return an error if the artist isn't found" do
      put :update, {id: 'fakeashellid', artist: {name: 'An updated Artist'}}
      expect(response.body).to match /"status":"error"/
    end
  end
end
