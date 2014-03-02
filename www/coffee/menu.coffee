class Menu
   constructor: ->
      @l = get_current_locale(@locales)
      
   locales:
      en:
         menu:             "Menu"
         logout:           "Logout"
         change_password:  "Change Password"
         close:            "Close"
         
      de:
         menu:             "Menü"
         logout:           "Ausloggen"
         change_password:  "Passwort ändern"
         close:            "Schließen"
         
      fr:
         menu:             "Menu"
         logout:           "Quitter"
         change_password:  "Modifier mot de passe"
         close:            "Fermer"