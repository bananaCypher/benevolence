class PlaylistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    playlists = Playlist.all.map do |playlist|
      {
        id: playlist.id.to_s,
        title: playlist.title,
        tracks: playlist.songs.map {|s| s.id.to_s}
      }
    end
    render json: playlists
  end

  def show
    playlist = get_playlist || return
    tracks = playlist.songs.map do |song|
      song.id.to_s
    end
    return_playlist = {
      id: playlist.id,
      title: playlist.title,
      tracks: tracks
    }
    render json: return_playlist
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
    song = Song.find(params[:song])
    playlist = get_playlist || return
    puts "Before Update: #{playlist.songs}"
    playlist.songs.push(song)
    playlist.save
    puts "After Update: #{playlist.songs}"
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
