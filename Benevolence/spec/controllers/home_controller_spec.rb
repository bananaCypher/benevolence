require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  render_views
  describe 'GET index' do
    it 'should render the home page' do
      get :index
      expect(response.body).to match '<div id="app">'
    end
  end
end
