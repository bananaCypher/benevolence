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

end
