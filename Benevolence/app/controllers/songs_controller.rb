class SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Song.all, methods: :file_url
  end

  def show
    render json: Song.find(params[:id]), methods: :file_url
  end

  def create
    song = Song.new(song_params)  
    song.user = current_user
    song.save
    render json: song, methods: :file_url
  end

  def update
    song = Song.find(params[:id])
    song.update(song_params)
    song.save
    render json: song, methods: :file_url
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
end
