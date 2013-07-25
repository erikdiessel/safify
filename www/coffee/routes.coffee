get_API_URL = (path) ->
   baseURL = 'https://safify-api.herokuapp.com/'
   baseURL + path
         
save_changes = ->
   $.ajax
      url: get_API_URL('passwords')
      type: 'PUT' 
      data:
         password_list: sjcl.encrypt(login.client_password(), password_list.toJSON())
         username: login.sanitized_username()
         password: login.server_password()
   
check_for_login = (context) ->
   logged_in = login.logged_in()
   if not logged_in
      context.preventDefault() # context is an event-object
      $.mobile.changePage('#login')
   logged_in
   
toggle_loading = ->
   $('[href="#login-server"]').toggleClass('loading')
   $('[href="#registration"]').toggleClass('loading')

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
      
   'deletion': ->
      deletion.entry_title(current_entry.title())
      
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
            type: 'GET'
            url: get_API_URL('passwords')
            data:
               username: login.sanitized_username()
               password: login.server_password()
   
            success: (data, textStatus, jqXHR) ->
               
               decrypted = sjcl.decrypt(login.client_password(), data)
               password_list.fromJSON(decrypted)
               
               login.logged_in(true)
               $.mobile.changePage('#passwords', { transition: "none" })
               $('[data-role="listview"]').listview('refresh')
               toggle_loading()
               
            statusCode:
               403: ->
                  toggle_loading()
                  login.reset_error_messages()
                  login.username_not_found(true)
               401: ->
                  toggle_loading()
                  login.reset_error_messages()
                  login.authentification_failed(true)
               404: ->
                  toggle_loading()
                  login.reset_error_messages()
                  login.no_connection(true)
            
   'register-server': ->
      if registration.check(login.password())
         $.ajax
            type: 'POST'
            url: get_API_URL('register')
            data: 
               username: login.sanitized_username()
               password: login.server_password()
                     
         login.logged_in(true)
         $.mobile.changePage('#passwords', { transition: "none" })

      
   'generate': ->
      # trigger re-evaluation of password
      generator.regenerate()
      
   # redirect not logged-in users to the login-page
   'passwords': ->
      check_for_login(this)
      
   'check_for_username': ->
      if login.check()
         toggle_loading()
      
         $.ajax
            type: 'GET'
            url: get_API_URL('username_not_used')
            data:
               username: login.sanitized_username()
            statusCode:
               200: ->
                  toggle_loading()
                  login.reset_error_messages()
                  $.mobile.changePage('#registration', { transition: "none" })
               409: ->
                  login.reset_error_messages()
                  login.username_already_used(true)
                  toggle_loading()
                  
         registration.username(login.username())         
         registration.repetition_wrong(false)
         registration.password_repetition("")
         
   'install_in_firefox': ->
      request = navigator.mozApps.install(manifest_url)
      request.onerror = ->
         console.log 'Error during install'
      request.onsuccess = ->
         console.log 'Successfully installed'