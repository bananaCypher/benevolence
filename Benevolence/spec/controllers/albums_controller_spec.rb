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
end
