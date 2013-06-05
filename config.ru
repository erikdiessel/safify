use Rack::Static, 
   :root => "src",
   :urls => [""],
   :index => 'index.html',
   :header_rules => [
      [ ['webapp'], { 'Content-Type' => 'application/x-web-app-manifest+json' } ]
   ]

run lambda { |env|
  [
    404, 
    {
      'Content-Type'  => 'text/html'
    },
    File.open('src/error_pages/404.html', File::RDONLY)
  ]
}