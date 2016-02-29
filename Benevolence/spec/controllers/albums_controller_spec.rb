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
end
