class ArtistsController < ApplicationController
  def index
    render json: Artist.all
  end

  def show
    artist = get_artist || return
    render json: artist, methods: :file_url
  end

  def create
    begin
      artist = Artist.new(artist_params)  
      artist.save
      render json: {status: 'success', message: 'Artist was successfully created'}
    rescue
      render json: {status: 'error', message: 'Failed to create artist'}
    end
  end

  private
  def artist_params
    params.require(:artist).permit(:name)
  end

  def render_not_found
    render json: {status: 'error', message: 'Artist not found'}
  end

  def get_artist
    artist = Artist.find(params[:id])
    render_not_found if !artist
    return artist
  end
end
