get_API_URL = (path) ->
   baseURL = 'https://fortressofkeys-api.herokuapp.com/'
   baseURL + path
         
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
   
   'details~:index': (index) ->
      model.list.new_current(index)
      
   'login-server': ->
      $.ajax
         url: get_API_URL('passwords')
         data:
            username: model.login.username()
            password: model.login.server_password()

         success: (data, textStatus, jqXHR) ->
            decrypted = sjcl.decrypt(model.login.client_password(), data)
            model.list.fromJSON(decrypted)
            model.login.logged_in(true)
            $.mobile.changePage('#passwords')
            $('[data-role="listview"]').listview('refresh')
            
         statusCode:
            404: ->
               model.login.username_not_found(true)
               model.login.authentification_failed(false)
            403: ->
               model.login.authentification_failed(true)
               model.login.username_not_found(false)
            
   'register-server': ->
      $.ajax
         type: 'POST'
         url: get_API_URL('register')
         data: 
            username: model.login.username()
            password: model.login.server_password()
         success: (data, textStatus, jqXHR) ->
            $.mobile.changePage('#passwords')
         statusCode:
            409:
               model.login.username_already_used(true)

      
   'generate': ->
      # trigger re-evaluation of password
      model.generator.regenerate()
      
   # redirect not logged-in users to the login-page
   'passwords': ->
      if not model.login.logged_in()
         this.preventDefault() # *this* is an event-object
         $.mobile.changePage('#login')