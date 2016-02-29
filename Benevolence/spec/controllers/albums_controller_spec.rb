require 'rails_helper'

RSpec.describe AlbumsController, type: :controller do
  describe 'GET index' do
    before(:each) do
      create(:album)
      create(:album)
      create(:album)
      create(:album)
      create(:album)
    end
    it 'should respond with JSON' do
      get :index
      expect(response.content_type).to eq "application/json"
    end
    it 'should contain all the albums' do
      get :index
      ids = Album.all.map{|a| a.id }
      ids.each do |id|
        expect(response.body).to match /"#{id}\"}/
      end
    end
  end

  describe 'GET show' do
    before(:each) do
      create(:album)
      create(:album)
      create(:album)
      @album = create(:album) 
    end
    it 'should respond with JSON' do
      get :show, {id: @album.id}
      expect(response.content_type).to eq "application/json"
    end
    it 'should return the requested album' do
      get :show, {id: @album.id}
      expect(response.body).to match /"#{@album.id}"/
    end
    it 'should return only the requested album' do
      get :show, {id: @album.id}
      albums = Album.where(:id.ne => @album.id)
      ids = albums.map{|a| a.id }
      ids.each do |id|
        expect(response.body).to_not match /"#{id}\"}/
      end
    end
    it "should return an error if the album isn't found" do
      get :show, {id: 'iamsuchafakeid'}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'POST create' do
    before(:each) do
      @album_object = {album: {name: 'An Album'}}
    end
    it 'should respond with JSON' do
      post :create, @album_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should be able to create a new album' do
      random = SecureRandom.uuid
      post :create, {album: {name: random}}
      expect(Album.where(name: random).length).to eq(1)
    end
    it 'should return a success message if album was created' do
      post :create, @album_object
      expect(response.body).to match /"status":"success"/
    end
    it 'should return an error message if album failed to create' do
      post :create, {random_key: 'random stuff'}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'PUT update' do
    before(:each) do
      @album = create(:album)
      @update_object = {id: @album.id, album: {name: 'An updated Album'}}
    end
    it 'should respond with JSON' do
      post :update, @update_object
      expect(response.content_type).to eq("application/json")
    end
    it 'should update the given album' do
      put :update, @update_object
      album = Album.find(@album.id)
      expect(album.name).to eq('An updated Album')
    end
    it 'should not update any other album' do
      albums = Album.all.find_all {|a| a.id != @album.id}
      put :update, @update_object
      new_albums = Album.all.find_all {|a| a.id != @album.id}
      new_albums.each_with_index do |a, i|
        expect(a.name).to eq(albums[i].name)
      end
    end
    it "should return a success message if the album was updated" do
      put :update, @update_object
      expect(response.body).to match /"status":"success"/
    end
    it "should return an error if the album isn't found" do
      put :update, {id: 'fakeashellid', album: {name: 'An updated Album'}}
      expect(response.body).to match /"status":"error"/
    end
  end

  describe 'DELETE destroy' do
    before(:each) do
      @album = create(:album)
    end
    it 'should respond with JSON' do
      delete :destroy, {id: @album.id}
      expect(response.content_type). to eq("application/json")
    end
    it 'should delete the given album' do
      random = SecureRandom.uuid
      album = Album.create(name: random)
      delete :destroy, {id: album.id}
      expect(Album.where(name: random).length).to eq(0)
    end
    it "should return an error if the album isn't found" do
      delete :destroy, {id: 'justanotherfakeid'}
      expect(response.body).to match /"status":"error"/
    end
    it "should return a success message if the album was deleted" do
      delete :destroy, {id: @album.id}
      expect(response.body).to match /"status":"success"/
    end
  end
end
