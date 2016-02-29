class HomeController < ApplicationController
  def index
    render template: "layouts/application.html.erb"
  end
end
