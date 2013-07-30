Rack::Mime::MIME_TYPES.merge!({
   '.webapp'   => 'application/x-web-app-manifest+json',
   '.appcache' => 'text/cache-manifest'
})

use Rack::Deflater

use Rack::Static, 
   :root => "www",
   :urls => [""],
   :index => 'index.html'

# The following part is required
run lambda { |env|
  [
    404, 
    {
      'Content-Type'  => 'text/html'
    },
    File.open('src/error_pages/404.html', File::RDONLY)
  ]
}