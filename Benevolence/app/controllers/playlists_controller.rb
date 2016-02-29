class PlaylistsController < ApplicationController
  skip_before_action :verify_authenticity_token

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

  def update
    playlist = get_playlist || return
    playlist.update(playlist_params)
    playlist.save
    render json: {status: 'success', message: 'Playlist was successfully updated'}
  end

  def destroy
    playlist = get_playlist || return
    playlist.destroy
    render json: {status: 'success'}
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
