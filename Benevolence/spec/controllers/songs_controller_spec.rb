require 'rails_helper'

RSpec.describe SongsController, type: :controller do
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
end
