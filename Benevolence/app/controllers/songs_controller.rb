class SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Song.all, methods: :file_url
  end

  def show
    song = get_song || return
    if song.album
      album = song.album.id.to_s
    end
    return_song = {
      id: song.id.to_s,
      title: song.title,
      artist: song.artist.id.to_s,
      album: album || '',
      file_url: song.file_url()
    }
    render json: return_song
  end

  def create
    begin
      song = Song.new(song_params)  
      song.user = current_user
      song.save
      render json: {status: 'success', message: 'Song was successfully created'}
    rescue
      render json: {status: 'error', message: 'Failed to create song'}
    end
  end

  def update
    song = get_song || return
    song.update(song_params)
    song.save
    render json: {status: 'success', message: 'Song was successfully updated'}
  end

  def destroy
    song = get_song || return
    song.destroy
    render json: {status: 'success'}
  end

  private
  def song_params
    params.require(:song).permit(:title)
  end

  def render_not_found
    render json: {status: 'error', message: 'Song not found'}
  end

  def get_song
    song = Song.find(params[:id])
    render_not_found if !song
    return song
  end
end
