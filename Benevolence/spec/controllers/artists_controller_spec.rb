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
    it 'should return the requested song' do
      get :show, {id: @artist.id}
      expect(response.body).to match /"#{@artist.id}"/
    end
    it 'should return only the requested song' do
      get :show, {id: @artist.id}
      artists = Artist.all[0..Artist.all.length - 2]
      ids = artists.map{|s| s.id }
      ids.each do |id|
        expect(response.body).to_not match /"#{id}\"}/
      end
    end
    it "should return an error if the song isn't found" do
      get :show, {id: 'iamsuchafakeid'}
      expect(response.body).to match /"status":"error"/
    end
  end
end
