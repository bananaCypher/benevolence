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
end
