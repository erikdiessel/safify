get_API_URL = (path) ->
   baseURL = 'https://fortressofkeys-api.herokuapp.com/'
   baseURL + path
         
save_changes = ->
   $.ajax
      url: get_API_URL('passwords')
      type: 'PUT' 
      data:
         password_list: sjcl.encrypt(login.client_password(), password_list.toJSON())
         username: login.username()
         password: login.server_password()
   
check_for_login = (context) ->
   logged_in = login.logged_in()
   if not logged_in
      context.preventDefault() # context is an event-object
      $.mobile.changePage('#login')
   logged_in
   
toggle_loading = ->
   $('[href="#login-server"]').toggleClass('loading')
   
routes =
   'new': ->
      if check_for_login(this)
         current_entry.actualize_to(new Entry(-1)) # index of -1 means: not saved
      
   'save-current': ->
      password_list.save(current_entry)
      save_changes()
      $.mobile.changePage("#passwords")
      $('[data-role="listview"]').listview('refresh')
      
   'edit~:index': (index) ->
      current_entry.actualize_to(password_list.get_entry(index))
      
   'delete-current': ->
      password_list.delete(current_entry)
      save_changes()
      $.mobile.changePage("#passwords")
   
   'details~:index': (index) ->
      current_entry.actualize_to(password_list.get_entry(index))
      
   'login-server': ->
      if login.check()
         toggle_loading()
         $.ajax
            url: get_API_URL('passwords')
            data:
               username: login.username()
               password: login.server_password()
   
            success: (data, textStatus, jqXHR) ->
               
               decrypted = sjcl.decrypt(login.client_password(), data)
               password_list.fromJSON(decrypted)
               
               login.logged_in(true)
               $.mobile.changePage('#passwords')
               $('[data-role="listview"]').listview('refresh')
               
            statusCode:
               404: ->
                  toggle_loading()
                  login.username_not_found(true)
                  login.authentification_failed(false)
               403: ->
                  toggle_loading()
                  login.authentification_failed(true)
                  login.username_not_found(false)
            
   'register-server': ->
      if login.check()
         toggle_loading()
         $.ajax
            type: 'POST'
            url: get_API_URL('register')
            data: 
               username: login.username()
               password: login.server_password()
            statusCode:
               201: ->
                  toggle_loading()
                  login.logged_in(true)
                  $.mobile.changePage('#passwords')
               409: ->
                  toggle_loading()
                  login.username_already_used(true)

      
   'generate': ->
      # trigger re-evaluation of password
      generator.regenerate()
      
   # redirect not logged-in users to the login-page
   'passwords': ->
      check_for_login(this)