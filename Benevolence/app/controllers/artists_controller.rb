class ArtistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Artist.all, methods: :unique_songs
  end

  def show
    artist = get_artist || return
    render json: artist, methods: :unique_songs
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

  def update
    artist = get_artist || return
    artist.update(artist_params)
    artist.save
    render json: {status: 'success', message: 'Artist was successfully updated'}
  end

  def destroy
    artist = get_artist || return
    artist.destroy
    render json: {status: 'success'}
  end

  def search
    term = params[:term]
    artists = Artist.where(name: /#{term}/i)
    artists = artists.map do |artist|
      {
        id: artist.id.to_s,
        name: artist.name,
        small_art: artist.small_art,
        large_art: artist.large_art,
        songs: artist.unique_songs
      }
    end
    render json: artists
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
