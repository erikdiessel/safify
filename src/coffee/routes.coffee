get_API_URL = (path) ->
   baseURL = 'https://fortressofkeys-api.herokuapp.com/'
   baseURL + path

routes = {}

route = (path, func) ->
   routes[path] = func
   
setupRoutes = ->
   router.set_routes(routes)
   $(document).bind "pagebeforechange", ( e, data ) ->
      if typeof data.toPage == "string"
         data.options.dataUrl = data.toPage
         router.route(data.toPage)
         data.toPage = data.toPage.replace(/#([^\~]+)~.+/i, "#$1")
         
save_changes = ->
   $.ajax
      url: get_API_URL('passwords')
      type: 'PUT' 
      data:
         password_list: sjcl.encrypt(model.login.client_password(), model.list.toJSON())
         username: model.login.username()
         password: model.login.server_password()

      success: (data, textStatus, jqXHR) ->
         console.log('successfully saved')
   
routes =
   'new': ->
      model.list.new_current(model.list.entries().length)
      
   'save-current': ->
      model.list.save_current()
      save_changes()
      $.mobile.changePage("#passwords")
      $('[data-role="listview"]').listview('refresh')
      
   'edit~:index': (index) ->
      model.list.new_current(index)
      
   'delete-current': ->
      model.list.delete_current()
      save_changes()
      $.mobile.changePage("#passwords")
   
   'copying~:index': (index) ->
      model.current.title(model.list.entries()[index].title())
      model.current.username(model.list.entries()[index].username())
      model.current.password(model.list.entries()[index].password())
      
   'login-server': ->
      $.ajax
         url: get_API_URL('passwords')
         data:
            username: model.login.username()
            password: model.login.server_password()

         success: (data, textStatus, jqXHR) ->
            decrypted = sjcl.decrypt(model.login.client_password(), data)
            model.list.fromJSON(decrypted)
            $.mobile.changePage('#passwords')
            
   'register-server': ->
      $.ajax
         type: 'POST'
         url: get_API_URL('register')
         data: 
            username: model.login.username()
            password: model.login.server_password()
      
      $.mobile.changePage('#passwords')
      
   'generate': ->
      # trigger re-evaluation of password
      model.generator.password()