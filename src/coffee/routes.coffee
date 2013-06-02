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
            $.mobile.changePage('#passwords')
            $('[data-role="listview"]').listview('refresh')
            
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
      model.generator.regenerate()