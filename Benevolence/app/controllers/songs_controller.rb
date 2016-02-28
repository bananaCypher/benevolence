class SongsController < ApplicationController
  def index
    render json: Song.all, methods: :file_url
  end
end
