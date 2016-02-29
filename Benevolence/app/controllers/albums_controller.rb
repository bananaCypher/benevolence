class AlbumsController < ApplicationController
  def index
    render json: Album.all
  end

  def show
    album = get_album || return
    render json: album, methods: :file_url
  end

  private
  def render_not_found
    render json: {status: 'error', message: 'Album not found'}
  end

  def get_album
    album = Album.find(params[:id])
    render_not_found if !album
    return album
  end
end
