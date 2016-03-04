require 'net/http'
module SongsHelper
  def get_linked_artist(name)
    artists = Artist.where(name: name)
    if (artists.empty?)
      return scrape_artist(name)
    else
      return artists[0]
    end
  end
  def scrape_artist(name)
    key = Rails.application.config.audioDB_api_key
    result = Net::HTTP.get(
      URI.parse("http://www.theaudiodb.com/api/v1/json/#{key}/search.php?s=#{name}")
    )
    artist_details = JSON.parse(result).artists[0]
    artist = Artist.create(
      name: name, 
      small_art: artist_details.strArtistThumb, 
      large_art: artist_details.strArtistFanart, 
      biography: artist_details.strBiographyEN
    )
    return artist
  end
end
