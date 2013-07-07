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
   
check_for_login = (context) ->
   logged_in = model.login.logged_in()
   if not logged_in
      context.preventDefault() # context is an event-object
      $.mobile.changePage('#login')
   logged_in
   
toggle_loading = ->
   $('[href="#login-server"]').toggleClass('loading')
   
routes =
   'new': ->
      if check_for_login(this)
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
      if model.login.check()
         toggle_loading()
         $.ajax
            url: get_API_URL('passwords')
            data:
               username: model.login.username()
               password: model.login.server_password()
   
            success: (data, textStatus, jqXHR) ->
               toggle_loading()
               try
                  decrypted = sjcl.decrypt(model.login.client_password(), data)
                  model.list.fromJSON(decrypted)
               catch error
                  console.log 'password_list is empty; starting with new one'
               model.login.logged_in(true)
               $.mobile.changePage('#passwords')
               $('[data-role="listview"]').listview('refresh')
               
            statusCode:
               404: ->
                  toggle_loading()
                  model.login.username_not_found(true)
                  model.login.authentification_failed(false)
               403: ->
                  toggle_loading()
                  model.login.authentification_failed(true)
                  model.login.username_not_found(false)
            
   'register-server': ->
      if model.login.check()
         toggle_loading()
         $.ajax
            type: 'POST'
            url: get_API_URL('register')
            data: 
               username: model.login.username()
               password: model.login.server_password()
            statusCode:
               201: ->
                  toggle_loading()
                  model.login.logged_in(true)
                  $.mobile.changePage('#passwords')
               409: ->
                  toggle_loading()
                  model.login.username_already_used(true)

      
   'generate': ->
      # trigger re-evaluation of password
      model.generator.regenerate()
      
   # redirect not logged-in users to the login-page
   'passwords': ->
      check_for_login(this)