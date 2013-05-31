class Router
   set_routes: (routes) =>
      @routes = routes
   
   route: (path) =>
      matchings = (pattern, path) ->
         parsed_pattern = new RegExp(
            "#{pattern.replace(/:([a-z]|[0-9])+/g, '([a-z]|[0-9])+')}\/?$", 'i'
         )
         result = parsed_pattern.exec(path)
         if result?
            result.splice(1,result.length-1)
         else
            null
         
      
      for pattern, func of @routes
         bindings = matchings(pattern, path)
         if bindings?
            func.apply(this, bindings)
            
router = new Router()

routes = {}
   
setupRoutes = ->
   router.set_routes(routes)
   $(document).bind "pagebeforechange", ( e, data ) ->
      if typeof data.toPage == "string"
         data.options.dataUrl = data.toPage
         router.route(data.toPage)
         data.toPage = data.toPage.replace(/#([^\~]+)~.+/i, "#$1")