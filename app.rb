require 'sinatra'
require 'json'

require './api'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/RestSearchAPI/' do
  keyid = "10d8ccc0f685608f8e951ef4053ee35e"
  latitude = params['latitude']
  longitude = params['longitude']
  range = params['range']
  params = URI.encode_www_form({ keyid: keyid, latitude: latitude, longitude: longitude, range: range})
  uri = URI.parse("https://api.gnavi.co.jp/RestSearchAPI/v3/?#{params}")
  
  content_type :json
  data = gnavi(uri)
  if data then
    data.to_json
  end
end
