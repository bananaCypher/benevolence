class SongsController < ApplicationController
  def index
    render json: Song.all, methods: :file_url
  end

  def show
    render json: Song.find(params[:id]), methods: :file_url
  end
end
