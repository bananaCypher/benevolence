class PlaylistsController < ApplicationController
  def index
    render json: Playlist.all
  end

  def show
    playlist = get_playlist || return
    render json: playlist
  end

  def create
    begin
      playlist = Playlist.new(playlist_params)  
      playlist.user = current_user
      playlist.save
      render json: {status: 'success', message: 'Playlist was successfully created'}
    rescue
      render json: {status: 'error', message: 'Failed to create playlist'}
    end
  end

  private
  def playlist_params
    params.require(:playlist).permit(:title)
  end

  def render_not_found
    render json: {status: 'error', message: 'Playlist not found'}
  end

  def get_playlist
    playlist = Playlist.find(params[:id])
    render_not_found if !playlist
    return playlist
  end
end
