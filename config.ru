use Rack::Static, 
  :urls => {'/' => 'index.html'},
  :root => "src"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('src/error_pages/404.html', File::RDONLY)
  ]
}