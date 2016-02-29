class ArtistsController < ApplicationController
  def index
    render json: Artist.all
  end

  def show
    artist = get_artist || return
    render json: artist, methods: :file_url
  end

  private
  def render_not_found
    render json: {status: 'error', message: 'Artist not found'}
  end

  def get_artist
    artist = Artist.find(params[:id])
    render_not_found if !artist
    return artist
  end
end
