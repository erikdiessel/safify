class Router
   set_routes: (routes) =>
      @routes = routes
   
   # event_object is passed to the matched functions as *this*
   route: (path, event_object) =>
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
            func.apply(event_object, bindings) # this = event_object
            
            
router = new Router()

routes ||= {}
   
setupRoutes = ->
   router.set_routes(routes)
   $(document).bind "pagebeforechange", ( event, data ) ->
      if typeof data.toPage == "string"
         data.options.dataUrl = data.toPage
         router.route(data.toPage, event)
         data.toPage = data.toPage.replace(/#([^\~]+)~.+/i, "#$1")