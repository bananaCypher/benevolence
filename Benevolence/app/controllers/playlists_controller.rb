class PlaylistsController < ApplicationController
  def index
    render json: Playlist.all
  end
end
