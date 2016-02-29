class PlaylistsController < ApplicationController
  def index
    render json: Playlist.all
  end

  def show
    playlist = get_playlist || return
    render json: playlist
  end

  private
  def playlist_params
    params.require(:playlist).permit(:name)
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
