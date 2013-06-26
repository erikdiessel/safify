class Login
   constructor: ->
      @username = ko.observable("")
      @password = ko.observable("")
      @logged_in = ko.observable(false)
      @username_not_found = ko.observable(false)
      @authentification_failed = ko.observable(false)
      @username_already_used = ko.observable(false)
      @username_missing = ko.observable(false)
      @password_missing = ko.observable(false)

   server_password: =>
      salt = [184, 83, 26, 133, 22, 40, 115, 123, 141, 115, 39, 53, 168, 172, 49, 165, 106, 215, 114, 180]
      iterations = 2347
      JSON.stringify(
         sjcl.misc.pbkdf2(@password(), salt.concat(sjcl.hash.sha256.hash(@username())), iterations)
      )

   client_password: =>
      salt = [71,52,235,209,156,43,102,198,190,98,3,221,187,29,74,138,50,179,179,16]
      iterations = 3497
      JSON.stringify(
         sjcl.misc.pbkdf2(@password(), salt.concat(sjcl.hash.sha256.hash(@username())), iterations)
      )
   
   check: =>
      @username_missing(@username() == "") 
      @password_missing(@password() == "")
      not @username_missing() and not @password_missing()