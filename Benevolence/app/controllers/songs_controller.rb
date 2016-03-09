require 'net/http'
require 'digest'
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
    metadata = JSON.parse(params[:metadata])
    begin
      song = Song.new(title: metadata['title'])  
      song.user = current_user
      song.save
      uploaded_file = params[:file]
      md5 = Digest::MD5.file uploaded_file.path
      File.open(song.file_path, 'wb') do |file|
          file.write(uploaded_file.read)
      end
      new_md5 = Digest::MD5.file song.file_path
      if md5 != new_md5
        puts "prev: #{md5}, new: #{new_md5}"
        raise
      end
      artist = get_linked_artist(metadata['artist'])
      song.artist = artist
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

  def search
    term = params[:term]
    songs = Song.where(title: /#{term}/i)
    songs = songs.map do |song|
      if song.album
        album = song.album.id.to_s
      end
      {
        id: song.id.to_s,
        title: song.title,
        artist: {
          id: song.artist.id.to_s,
          name: song.artist.name,
          small_art: song.artist.small_art
        },
        album: album || '',
        file_url: song.file_url()
      }
    end
    render json: songs
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

  def get_linked_artist(name)
    artists = Artist.where(name: /#{name}/i)
    if (artists.empty?)
      return scrape_artist(name)
    else
      return artists[0]
    end
  end

  def scrape_artist(name)
    key = Rails.application.config.audioDB_api_key
    url = URI.escape "http://www.theaudiodb.com/api/v1/json/#{key}/search.php?s=#{name}"
    result = Net::HTTP.get(
      URI.parse(url)
    )
    artist_details = JSON.parse(result)['artists'][0]
    artist = Artist.create(
      name: name, 
      small_art: artist_details['strArtistThumb'], 
      large_art: artist_details['strArtistFanart'], 
      biography: artist_details['strBiographyEN']
    )
    return artist
  end
end
