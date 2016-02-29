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
end
