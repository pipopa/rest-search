require 'openssl'
require 'net/http'
require 'net/https'

def gnavi(uri)
  begin
    http = Net::HTTP.new(uri.host, uri.port)

    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    req = Net::HTTP::Get.new(uri.request_uri)

    res = http.request(req)
    puts res.code, res.msg
    case res
    when Net::HTTPSuccess
      return JSON.parse(res.body)
    else
      p "HTTP ERROR: code=#{res.code}"
    end

  rescue => e
    p "Something error happened"
    p e.message
  end
end
