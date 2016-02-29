class AlbumsController < ApplicationController
  def index
    render json: Album.all
  end

  def show
    album = get_album || return
    render json: album
  end

  def create
    begin
      album = Album.new(album_params)  
      album.save
      render json: {status: 'success', message: 'Album was successfully created'}
    rescue
      render json: {status: 'error', message: 'Failed to create album'}
    end
  end

  def update
    album = get_album || return
    album.update(album_params)
    album.save
    render json: {status: 'success', message: 'Album was successfully updated'}
  end

  def destroy
    album = get_album || return
    album.destroy
    render json: {status: 'success'}
  end

  private
  def album_params
    params.require(:album).permit(:name)
  end

  def render_not_found
    render json: {status: 'error', message: 'Album not found'}
  end

  def get_album
    album = Album.find(params[:id])
    render_not_found if !album
    return album
  end
end
