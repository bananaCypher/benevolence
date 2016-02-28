class SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Song.all, methods: :file_url
  end

  def show
    song = get_song || return
    render json: Song.find(params[:id]), methods: :file_url
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
    song = Song.find(params[:id])
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
